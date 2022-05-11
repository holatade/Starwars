import React, { useState } from "react";

const Table = ({ characters }) => {
    const [sortNameAscending, setSortNameAscending] = useState(true);
    const [sortGenderAscending, setSortGenderAscending] = useState(true)
    const [sortHeightAscending, setSortHeightAscending] = useState(true)
    const [chararacter, setCharacter] = useState(characters);
    const [filteredChar, setFilteredChar] = useState(characters);

    const tol = (total) => {
        let heightInc = Math.round((total * 0.393700787+ Number.EPSILON) * 100) /100;
        let heightFt = Math.round((total * 0.032808399 + Number.EPSILON) * 100) /100;
        return `${total} cm (${heightFt}ft /  ${heightInc}in)`
    }

    // sort characters by name
    const sortName = () => {
        const sortAscending = sortNameAscending;
        setSortNameAscending(!sortNameAscending);
        filteredChar.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return sortAscending ? -1 : 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return sortAscending ? 1 : -1;
            return 0;
        });
    }

    // sort characters by gender
    const sortGender = () => {
        const sortAscending = sortGenderAscending;
        setSortGenderAscending(!sortGenderAscending);
        filteredChar.sort(function (a, b) {
            if (a.gender.toLowerCase() < b.gender.toLowerCase()) return sortAscending ? -1 : 1;
            if (a.gender.toLowerCase() > b.gender.toLowerCase()) return sortAscending ? 1 : -1;
            return 0;
        });
    }

     // sort characters by height
    const sortHeight = () => {
        const sortAscending = sortHeightAscending;
        setSortHeightAscending(!sortHeightAscending);
        filteredChar.sort(function (a, b) {
            return sortAscending ? (a.height - b.height) : (b.height - a.height);
        });
    }

    //Filter characters by gender
    const filterCharacters = async (e) => {
        var value = e.target.value;
        if(value === "all"){
            setFilteredChar(chararacter)
            return;
        }
        let filteredCharacter = chararacter.filter((item) => {
            return  item.gender === value
        })
        setFilteredChar(filteredCharacter)
    }

  if(characters.length > 0){
      console.log(filteredChar);
    return (
        <div className="mt-4 mb-3 mx-auto"  style={{ width: '70%' }}>
             <select  className="my-2" id="films" name="cars" onChange={filterCharacters}>
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="n/a">N/A</option>
                <option value="amaphrodite">Amaphrodite</option>
            </select>
            <table className="table table-borderless ">
                <thead>
                    <tr style={{ border: "1px solid yellow", color: "grey" }}>
                        <th scope="col">#</th>
                        <th scope="col" onClick={sortName}>Name</th>
                        <th scope="col" onClick={sortGender}>Gender</th>
                        <th scope="col" onClick={sortHeight}>Height</th>
                    </tr>
                </thead>
                <tbody style={{ color: "yellow" }}>
                    {filteredChar.map((char, index) => (
                        <tr key={index} style={{ border: "1px solid yellow" }} >
                            <th scope="row">{index+1}</th>
                            <td>{char.name}</td>
                            <td>{char.gender === "male" ? "Male" : char.gender === "female" ? "Female" : char.gender ===
                                        "n/a" ? "N/A" : "Amaphrodite"}</td>
                            <td>{char.height}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot  style={{ color: "yellow" }}>
                    <tr>
                        <th></th>
                        <th>{filteredChar.length}</th>
                        <th></th>
                        <th>{tol(filteredChar.reduce((x, y) => x + y.height,0))}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )

  }
    

}

export default Table;