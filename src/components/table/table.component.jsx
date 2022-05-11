import React, { useState, useEffect } from "react";

const Table = ({ characters }) => {
    const [sortNameAscending, setSortNameAscending] = useState(true);
    const [sortGenderAscending, setSortGenderAscending] = useState(true)
    const [sortHeightAscending, setSortHeightAscending] = useState(true)
    const [chararacter, setCharacter] = useState(characters);
    const [filteredChar, setFilteredChar] = useState(characters);
    const [total, setTotalInfo] = useState({});

    useEffect(() => {
        var tol = totalHeight()
        setTotalInfo({
            height: tol,
            totalCount : filteredChar.length
        });       
    }, [filteredChar]);

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

    // Get characters total height
    const totalHeight = () =>{
        let heightCm = filteredChar.reduce((x, y) => x + y.height,0);
        let heightInc = Math.round((heightCm * 0.393700787+ Number.EPSILON) * 100) /100;
        let heightFt = Math.round((heightCm * 0.032808399 + Number.EPSILON) * 100) /100;

        return `${heightCm} cm (${heightFt}ft /
        ${heightInc}in)`
    }

    //Filter characters by gender
    const filterCharacters = async (e) => {
        var value = e.target.value;
        if(value == "all"){
            setFilteredChar(chararacter)
            return;
        }
        let filteredCharacter = chararacter.filter((item) => {
            return  item.gender == value
        })
        setFilteredChar(filteredCharacter)
    }

  if(chararacter.length > 0){
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
                            <td>{char.gender == "male" ? (<span className="iconify" data-icon="fontisto:male"
                                data-width="20" alt="male"></span>) : char.gender == "female" ? (<span className="iconify"
                                    data-icon="foundation:torso-female" data-width="30" alt="female"></span>) : char.gender ==
                                        "n/a" ? (<span className="iconify" data-icon="wi:na" data-width="30" alt="N/A"></span>) :
                                (<span className="iconify" data-icon="healthicons:female-and-male" data-width="30" alt="Amhaphrodite"></span>)}{char.gender}</td>
                            <td>{char.height}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot  style={{ color: "yellow" }}>
                    <tr>
                        <th></th>
                        <th>{total.totalCount}</th>
                        <th></th>
                        <th>{total.height}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )

  }
    

}

export default Table;