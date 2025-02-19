import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Save,
  User,
  Building2,
  Phone,
  Users,
  FileText,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Success from "./Success";
import ErrorPage from "./Error";
import { ComboboxDemo } from "@/components/comboBox";
import axios from "axios";

function Home() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<{ meetingWith?: string; photo?: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State untuk menyimpan pesan error
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Buku Tamu Desnet";
  }, []);

  const [formData, setFormData] = useState({
    institution_name: "",
    pic_name: "",
    phone_number: "",
    meeting_with: "",
    agenda: "",
  });

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isSubmitted]);

  const restartCamera = async () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error restarting camera:", error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "identity_photo.png", { type: "image/png" });
          setPhoto(file);
        }
      }, "image/png");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let errors: { meetingWith?: string; photo?: string } = {};
  
    if (!formData.meeting_with) {
      errors.meetingWith = "Please select an employee";
    }
    if (!photo) {
      errors.photo = "Photo is required";
    }
  
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
  
    setIsLoading(true);
    setIsSubmitted(true);
  
    handleSave()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
        setIsLoading(false);
      });
  };
  
  

  const resetForm = () => {
    setPhoto(null);
    setIsSubmitted(false);
    setFormData({
      institution_name: "",
      pic_name: "",
      phone_number: "",
      meeting_with: "",
      agenda: "",
    });
  };

  if (isSubmitted) return <Success onReset={resetForm} />;

  // Tampilkan halaman error jika terjadi error
  if (errorMessage) {
    return <ErrorPage message={errorMessage} onRetry={() => setErrorMessage(null)} />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("institution_name", formData.institution_name);
      formDataToSend.append("pic_name", formData.pic_name);
      formDataToSend.append("phone_number", formData.phone_number);
      formDataToSend.append("employee_id", formData.meeting_with);
      formDataToSend.append("agenda", formData.agenda);
      if (photo) formDataToSend.append("identity_photo", photo);

      const response = await axios.post("http://localhost:8080/guestbook", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
      throw error; // Lempar error untuk ditangkap di handleSubmit
    }
  };

  const handleMeetingWithChange = (selectedId: string) => {
    setFormData((prev) => ({
      ...prev,
      meeting_with: selectedId,
    }));
    setError((prev) => ({ ...prev, meetingWith: "" }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-700">Saving data, please wait...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Guest Book</h1>
            <p className="mt-2 text-gray-600">Please fill in your visit details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Building2 className="w-4 h-4 mr-2" /> Institution Name
              </label>
              <input
                type="text"
                name="institution_name"
                required
                value={formData.institution_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 mr-2" /> PIC Name
              </label>
              <input
                type="text"
                name="pic_name"
                required
                value={formData.pic_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4 mr-2" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                required
                value={formData.phone_number}
                onChange={handleChange}
                pattern="[0-9]*"
                onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Users className="w-4 h-4 mr-2" /> Meeting With
              </label>
              <ComboboxDemo value={formData.meeting_with} onChange={handleMeetingWithChange} />
              {error.meetingWith && <p className="text-red-500 text-sm mt-1">{error.meetingWith}</p>}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <FileText className="w-4 h-4 mr-2" /> Agenda Details
              </label>
              <textarea
                name="agenda"
                required
                value={formData.agenda}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Camera className="w-4 h-4 mr-2" /> Identity Photo
              </label>
              <div className="mt-2 border rounded-lg p-4">
                {photo ? (
                  <>
                    <img src={URL.createObjectURL(photo)} alt="Captured identity" className="w-full rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        setPhoto(null);
                        restartCamera();
                      }}
                      className="w-full mt-2 py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
                    >
                      Retake Photo
                    </button>
                  </>
                ) : (
                  <>
                    <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
                    <canvas ref={canvasRef} className="hidden" />
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="w-full mt-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    >
                      Capture Photo
                    </button>
                  </>
                )}
              </div>
              {error.photo && <p className="text-red-500 text-sm mt-1">{error.photo}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;