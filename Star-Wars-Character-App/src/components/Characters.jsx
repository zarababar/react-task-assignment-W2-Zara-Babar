import React, { useState, useMemo, useRef } from "react";
import CharacterInformation from "./CharacterInformation";
import { randomNumberInRange } from "../utils/utils";
import { colorArray } from "../colors";

const IMAGEURL = import.meta.env.VITE_APP_RANDOM_IMAGES;

const Characters = ({ characters, species, homeWorlds }) => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const modalRef = useRef(null);

    const handleCharacterClick = (character) => {
        setSelectedCharacter(character);
        if (modalRef.current) {
            modalRef.current.style.display = 'flex';
        }
    };

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.style.display = 'none';
        }
        setSelectedCharacter(null);
    };

    const getCharacterColor = useMemo(() => (character) => {
        const characterSpeciesUrl = character.species[0];

        if (!characterSpeciesUrl) {
            return colorArray[randomNumberInRange(0, colorArray.length - 1)];
        }

        // Extract Id
        const speciesId = characterSpeciesUrl.split('/').slice(-2, -1)[0];
        const speciesMatch = species.find(species => species.url.includes(speciesId));

        return speciesMatch ? 'darkblue' : colorArray[randomNumberInRange(0, colorArray.length - 1)];
    }, [species]);

    return (
        <div className="page-container">
            {characters.map((character) => {
                const characterColor = getCharacterColor(character);

                return (
                    <div
                        key={character.url || character.name}
                        className="character-container movie-container pointer"
                        style={{ backgroundColor: characterColor }}
                        onClick={() => handleCharacterClick(character)}
                    >
                        <p>{character.name}</p>
                        <img src={`${IMAGEURL}${randomNumberInRange(1, 59)}`} alt={character.name} />
                    </div>
                );
            })}
            <div className="modal-overlay" ref={modalRef} style={{ display: 'none' }} onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    {selectedCharacter && <CharacterInformation character={selectedCharacter} homeWorlds={homeWorlds} />}
                    <button onClick={closeModal}>X</button>
                </div>
            </div>
        </div>
    );
};

export default Characters;