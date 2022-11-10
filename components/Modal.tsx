import { XMarkIcon } from "@heroicons/react/24/outline";
import MuiModal from "@mui/material/Modal";
import { setRevalidateHeaders } from "next/dist/server/send-payload";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Movie } from "../typings";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [data, setData] = useState();

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if(data?.)
      setData(data);
    }

    fetchMovie();
  }, [movie]);

  console.log(data);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        <button>
          <XMarkIcon
            className="modalButton absolute right-5 top-5 !z-40 
          h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          />
        </button>
      </>
    </MuiModal>
  );
}

export default Modal;
