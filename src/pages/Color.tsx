import React from "react";

import { 
    useState 
    , useEffect
} from "react";
  
import { 
    ColorType
    , getColors
    , addColor
    , deleteColor
    , updateColor
 } from "../services/ColorServices"


function Color() {

    const [colors, setColors] = useState<ColorType[]>([]);
    const [color, setColor] = useState<string>("");   


    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    }

    const addColorEvent = async () => {
        const newColor = await addColor(color);
        setColors([...colors, newColor]);
        setColor("");
    }

    const deleteColorEvent = async (id: number) => {
        await deleteColor(id);
        setColors(colors.filter((color) => color.id !== id));
    }

    const updateColorEvent = async (id: number) => {
        const updatedColor = await updateColor(id, color);
        setColors(prevColors => prevColors.map(color => color.id === id ? updatedColor : color));
        setColor("");
      };
    


    useEffect(() => {
        async function fetchData() {
            
            const x = await getColors();
            setColors(x);
        };
        fetchData();
    }, []);

    return (
        <div>
        <h1>Colors Management</h1>

            <span>Color: </span>
            <input 
                type="text" 
                placeholder="Type your new color"
                value={color}
                onChange={changeInput}
            />
            <button
                disabled={ color.length == 0 }
                onClick={addColorEvent}
            >
                Add
            </button>


            <ul>
                { colors.map((color) => (
                    <li key={color.id} >
                        { color.descripcion }
                        <button onClick={
                            () => deleteColorEvent(color.id)
                        } >
                            Remove
                        </button>
                        <button>
                            Edit
                        </button>
                    </li>
                    
                ))}
            </ul>

            <ul>
                { colors.map((color) => (
                    <li key={color.id} >
                        { color.descripcion }
                        <button onClick={
                            () => updateColorEvent(color.id)
                        } >
                            Update
                        </button>
                    </li>
                    
                ))}
            </ul>

        </div>
    );
}

export default Color;