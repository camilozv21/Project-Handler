import Modal from "react-bootstrap/Modal";
import { useState, useRef } from "react";

export const RegisterModal = (props) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState(null);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [imgFaceId, setImgFaceId] = useState(null);

  const videoRef = useRef();
  const canvasRef = useRef();

  const handleCloseVideo = () => {
    stopCamera();
    setShow(false);
  };
  const handleShowVideo = () => setShow(true);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
        videoRef.current.srcObject.removeTrack(track);
      });
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    handleShowVideo();
    const constraints = { video: true };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error en la cámara:", error.message);
    }
  }

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const aspectRatio = video.videoWidth / video.videoHeight;

    let canvasWidth = 640;
    let canvasHeight = canvasWidth / aspectRatio;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.drawImage(video, 0, 0, canvasWidth, canvasHeight);
    const imageData = canvas.toDataURL("image/png");
    setImageSrc(imageData);
    stopCamera();

    fetch(imageData)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `${Date.now()}_faceid`, { type: 'image/png' });

        // Now you can use 'file' as a regular file object
        setImgFaceId(file);
      });
  }

  const retakeImage = async () => {
    setImageSrc(null); // Borrar la imagen capturada del estado
    await startCamera();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleClose = () => {
    setImg(null);
    setEmail("");
    setLastName("");
    setName("");
    setPassword1("");
    setPassword2("");
    props.onHide();
  };

  const handleRegister = async (e) => {
    stopCamera();
    try {
      e.preventDefault();
      if (password1 !== password2) {
        setErrorPassword("Las contraseñas no coinciden");
        return;
      } else {
        setErrorPassword("");
      }
      const formData = new FormData();
      formData.append(
        "query",
        `
        mutation {
          addUser(
            name: "${name}",
            lastname: "${lastName}",
            email: "${email}",
            password: "${password1}",
            image: ""
            imgFaceId: ""
          ) {
            message
            statusCode
          }
        }
      `
      );
      formData.append("image", img);
      formData.append("imgFaceId", imgFaceId);
      setIsLoading(true);

      const response = await fetch("https://project-handler-jvl7.vercel.app/graphql", {
        method: "POST",
        body: formData,
      });
      let result = await response.json();
      setIsLoading(false);

      if (!result.data || result.errors) {
        if (result.errors.length > 0) {
          alert(result.errors[0].message);
        } else {
          alert("Ha ocurrido un error en el servidor.");
        }
      } else {
        if (result.data.addUser.statusCode === 200) {
          handleClose();
        } else if (result.data.addUser.statusCode === 401) {
          removeToken();
          window.location.reload();
        } else {
          alert(result.data.addUser.message);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error en la mutación:", error.message);
    }
  };

  return (
    <>
      <Modal {...props} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Registrarse
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleRegister}
          >
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleImageChange}
              multiple={false}
              accept="image/*"
            />
            <label
              htmlFor="file"
              className="flex items-center justify-center relative h-24 w-24 bg-blue-500 rounded-full p-2 cursor-pointer"
            >
              <img
                src={img ? URL.createObjectURL(img) : 'https://res.cloudinary.com/dj5kafiwa/image/upload/v1700750978/assets/default.png'}
                alt="usuario default"
              />
              <span className="absolute z-20 font-semibold text-center text-white inset-0 rounded-full flex items-center justify-center bg-blue-700 opacity-5 hover:opacity-100 transition-opacity ">
                Subir
                <br />
                Imagen
              </span>
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apellidos"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorPassword && (
              <p className="text-red-500 mb-0 ">
                ¡Las contraseñas no coinciden!
              </p>
            )}
            <input
              type="password"
              placeholder="Contraseña"
              className={`border-2 border-gray-400 rounded-md p-2 m-2 w-80 ${errorPassword ? "border-red-500" : ""
                }`}
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className={`border-2 border-gray-400 rounded-md p-2 m-2 w-80 ${errorPassword ? "border-red-500" : ""
                }`}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />

            <button
              type="button"
              className="bg-blue-50 border-2 border-blue-700 text-blue-700 font-bold py-2 px-4 rounded w-80 my-2 mb-3 hover:animate-glow"
              onClick={startCamera}
            >
              {isLoading ? (
                <div
                  className="spinner-border text-light"
                  role="status"
                ></div>
              ) : (
                "Face ID"
              )}
            </button>

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? (
                <div
                  className="spinner-border text-light"
                  role="status"
                ></div>
              ) : (
                "Registrarse"
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={show} onHide={handleCloseVideo}>
        <Modal.Header closeButton onClick={handleCloseVideo}>
          <Modal.Title>Face ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Asegúrate de que la imágen tenga <b>buena calidad</b> y estés completamente de <b>frente</b>, de esta forma podrás tener mejores resultados en tu registro de <em>face ID</em></p>
          {imageSrc ? (
            <img src={imageSrc} alt="captured" />
          ) : (
            <video ref={videoRef} autoPlay className="scale-x-100"></video>
          )}
          <canvas ref={canvasRef} width={640} height={480} className="hidden"></canvas>
        </Modal.Body>
        <Modal.Footer>
          <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleCloseVideo}>
            Guardar
          </button>
          {imageSrc ? (
            <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={retakeImage}>
              Repetir foto
            </button>
          ) : (
            <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={captureImage}>
              Tomar foto
            </button>
          )}

        </Modal.Footer>
      </Modal>
    </>
  );
};
