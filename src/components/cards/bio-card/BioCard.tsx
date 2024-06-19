import "./BioCard.css";
import { FaUser } from "react-icons/fa";
import Button from "../../button/Button";
import {Link} from "react-router-dom";

interface BioCardProps {
    name: string;
    title: string;
    birthYear?: string;
    extract: string;
    bioLink: string;
    thumbnail?: string;

}
const BioCard = ({
                     name = "",
                     title = "",
                     birthYear = "",
                     extract = "",
                     bioLink,
                     thumbnail = ""
                 }: BioCardProps) => {

    return (
        <section className="card">
            <div className="card-content">
                <div
                    data-testid="card-img-container"
                    className="card-img-container"
                    style={{
                        backgroundImage: `url(${thumbnail})`,
                        backgroundSize: "cover",
                    }}
                >
                    {!thumbnail && <FaUser className="missing-img" />}
                </div>
                <div className="card-text">
                    <h2>{name}</h2>
                    <h3>{title}</h3>
                    {birthYear && <h4>Born {birthYear}</h4>}
                    <p>{extract}</p>
                    {bioLink && (<div className="card-link">
                        <a data-testid="bio-link" href={bioLink} >
                            <Button name='Wiki Page' />
                        </a>
                    </div>)}
                </div>

            </div>

        </section>
    );
}

export default BioCard;
