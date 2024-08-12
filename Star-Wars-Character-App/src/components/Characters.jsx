import React, { useState, useMemo } from "react";
import CharacterInformation from "./CharacterInformation";
import { colorArray } from "../colors";

const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Characters = ({ characters, species, homeWorlds }) => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const imagesUrl = import.meta.env.VITE_APP_RANDOM_IMAGES;
    const handleCharacterClick = (character) => {
        setSelectedCharacter(character);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                        <img src={`${imagesUrl}${randomNumberInRange(1, 59)}`} alt={character.name} />
                    </div>
                );
            })}
            {isModalOpen && selectedCharacter && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <CharacterInformation character={selectedCharacter} homeWorlds={homeWorlds} />
                        <button onClick={closeModal}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Characters;
