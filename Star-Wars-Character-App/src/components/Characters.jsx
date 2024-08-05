// import React, { useState, useContext } from "react";
// import CharacterInformation from "./CharacterInformation";
// import { DataContext } from "../DataContext";
// import { colorArray } from "./colors";
// const randomNumberInRange = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const Characters = () => {
//     const { characters, species } = useContext(DataContext);
//     const [selectedCharacter, setSelectedCharacter] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleCharacterClick = (character) => {
//         setSelectedCharacter(character);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedCharacter(null);
//     };


//     return (
//         <div className="page-container">
//             {characters.map((character, index) => {
//                 const eyeColor = getEyeColor(character);

//                 return (
//                     <div
//                         key={index}
//                         className="character-container movie-container pointer"
//                         onClick={() => handleCharacterClick(character)}
//                     >
//                         <p>{character.name}</p>
//                         <img src={`https://picsum.photos/200/300?random=${randomNumberInRange(1, 59)}`} alt={character.name} />
//                     </div>
//                 );
//             })}
//             {isModalOpen && selectedCharacter && (
//                 <div className="modal-overlay" onClick={closeModal}>
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <CharacterInformation character={selectedCharacter} />
//                         <button onClick={closeModal}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Characters;
import React, { useState, useContext } from "react";
import CharacterInformation from "./CharacterInformation";
import { DataContext } from "../DataContext";
import { colorArray } from "../colors";
const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Characters = ({characters}) => {
    const {species } = useContext(DataContext);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCharacterClick = (character) => {
        setSelectedCharacter(character);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCharacter(null);
    };

    const getCharacterColor = (character) => {
        const characterSpeciesUrl = character.species[0];

        if (!characterSpeciesUrl) {
            return colorArray[randomNumberInRange(0, colorArray.length - 1)]
        }
        //Extract Id
        const speciesId = characterSpeciesUrl.split('/').slice(-2, -1)[0];

        const speciesMatch = species.find(species => species.url.includes(speciesId));

        return speciesMatch && 'darkblue';
    };
    return (
        <div className="page-container">
            {characters.map((character, index) => {
                const characterColor = getCharacterColor(character);

                return (
                    <div
                        key={index}
                        className="character-container movie-container pointer"
                        style={{ backgroundColor: characterColor }}
                        onClick={() => handleCharacterClick(character)}
                    >
                        <p>{character.name}</p>
                        <img src={`https://picsum.photos/200/300?random=${randomNumberInRange(1, 59)}`} alt={character.name} />
                    </div>
                );
            })}
            {isModalOpen && selectedCharacter && (
                <div className="modal-overlay" onClick={closeModal} >
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <CharacterInformation character={selectedCharacter} />
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Characters;
