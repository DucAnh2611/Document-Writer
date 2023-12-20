import App from "../App";

export const setToLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getfromLS = (key) => {
    let stringLS = localStorage.getItem(key);

    if(!stringLS) return null;
    return JSON.parse(stringLS);
}

export const theme = {
    data: {
        dark: {
            id: "T_001",
            name: "dark",
            colors: {
                body: "#1C1C1C",
                text: "#FFFFFF",
                nav: {
                    border: {
                        weight: "1px",
                        color: "#292929"
                    },
                    background:"#1C1C1C"
                },
                button: {
                    text: "#939393",
                    background: "#292929",
                    hover: {
                        background: "#454545",
                        text: "#FFFFFF"
                    }
                },
                link: {
                    opacity: 1,
                    text:""
                },
                svg: {
                    color: "#939393"
                },
                card: {
                    border: {
                        weight: "1px",
                        color: "#454545"
                    },
                    background:"#1C1C1C",
                    hover: {
                        background: "#292929"
                    }
                },
                card_detail: {
                    background: "#292929"
                },
                paper: {
                    text: "#FFFFFF",
                    background: "#1C1C1C",
                    border: {
                        weight: "1px",
                        color: "#454545"
                    }
                }
            },
            font: "Poppins"
        },
        light: {
            id: "T_002",
            name: "light",
            colors: {
                body: "#FFFFFF",
                text: "#1C1C1C",
                nav: {
                    border: {
                        weight: "1px",
                        color: "#BFBFBF"
                    },
                    background:"#FFFFFF"
                },
                button: {
                    text: "#292929",
                    background: "#BFBFBF",
                    hover: {
                        background: "#939393",
                        text: "#1C1C1C"
                    }
                },
                link: {
                    opacity: 1,
                    text:""
                },
                svg: {
                    color: "#939393"
                },
                card: {
                    border: {
                        weight: "1px",
                        color: "#BFBFBF"
                    },
                    background:"#FFFFFF",
                    hover: {
                        background: "#BFBFBF"
                    }
                },
                card_detail: {
                    background: "#BFBFBF"
                },
                paper: {
                    text: "#1C1C1C",
                    background: "#FFFFFF",
                    border: {
                        weight: "1px",
                        color: "#454545"
                    }
                }
            },
            font: "Poppins"
        }    
    }
}

export const ThemeGlobal = () => {
    setToLS('all-themes', theme);
    return (
        <App/>
    )
}
