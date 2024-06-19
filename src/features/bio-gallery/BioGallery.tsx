import { useContext } from "react";
import WikiContext from "../../context/wiki-context/context";
import { Bio } from "../../context/wiki-context/types";
import BioCard from "../../components/cards/bio-card/BioCard";
import "./BioGallery.css"

const BioGallery = () => {
  const { state } = useContext(WikiContext);
  const { paginatedData } = state;
  return (
    <div className="bio-gallery-container">
      {paginatedData && paginatedData.length > 0?
        (paginatedData.map((bio: Bio, index: number) => {
          return (
            <BioCard
              key={`bio-${index}`}
              name={bio.name}
              title={bio.title}
              birthYear={bio.birthYear}
              extract={bio.extract}
              thumbnail={bio.thumbnail}
              bioLink={bio.bioUrl}
            />
          );
        })) : (
        <p>No data available</p>
        )}
    </div>
  );
}


export default BioGallery