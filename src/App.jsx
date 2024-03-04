import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResult } from './Store/slices/searchResultSlice';
import './App.css';

function App() {
    const disPatch = useDispatch();
    const state = useSelector((state) => state);
    const [forecasts, setForecasts] = useState(null);
    const [histortData, sethistortData] = useState([]);
    const [icon, setIcon] = useState("");
    const [bgColorForResult, setbgColorForResult] = useState("");
    const searchtext = useRef("");
    const handleSearch = () => {
        setForecasts({});
        disPatch(fetchSearchResult(searchtext.current.value));
    }

    useEffect(() => {
        let lastSearch = state.searchResultSlice?.data
        setForecasts(lastSearch);
        if (lastSearch?.Message == "Safe") { setIcon("👍 "); setbgColorForResult("#00C561"); }
        if (lastSearch?.Message == "Warning") { setIcon("⚠️ "); setbgColorForResult("#FBBA27"); }
        if (lastSearch?.Message == "Alert") { setIcon("🤫 "); setbgColorForResult("#E8083E"); }
        if (lastSearch?.Message == "Unknown") { setIcon("🤔 "); setbgColorForResult("#00000045"); }

        let data = localStorage.getItem('WebSearch');
        data = JSON.parse(data);
        console.log(data)
        sethistortData(data);

    }, [state.searchResultSlice?.data])
    return (
        <div id="main-div">
            <h1 id="tabelLabel"><img alt="" src="" />Check Phishing URL</h1>

            <div className="">
                <div className="scanner-container" style={{ minWidth: "100%;" }} >
                    <input
                        className="ocrloader"
                        style={{ minWidth: "80%;" }}
                        type="search"
                        ref={searchtext}
                    />
                    <div className={state.searchResultSlice.isLoading ? "scanner-bar" : "scanner-bar-none"} ></div>
                    <button onClick={handleSearch}>Search</button>
                </div>

            </div>
            {forecasts?.Message != null ?
                <div className="form-search" style={{ textAlign: "left", borderColor: bgColorForResult }}>
                    <h1><span>{icon}</span>{forecasts.Message}</h1>
                    <p>{forecasts.URL}</p>
                </div> : ""}

            <div className="main-accordion">
                <details>
                    <summary>History Searches <b>({histortData?.length})</b></summary>
                    {
                        histortData.reverse().map((e) => {
                            console.log(e);
                            let iconhistory = "";
                            let iconhistoryBg = "";
                            if (e?.Message == "Safe") { iconhistory = "👍 "; iconhistoryBg = "#00C561"; }
                            if (e?.Message == "Warning") { iconhistory = "⚠️ "; iconhistoryBg = "#FBBA27"; }
                            if (e?.Message == "Alert") { iconhistory = "🤫 "; iconhistoryBg = "#E8083E"; }
                            if (e?.Message == "Unknown") { iconhistory = "🤔 "; iconhistoryBg = "#00000045"; }

                            return <> <div className="form-search" style={{ textAlign: "left", padding: "10px", borderColor: iconhistoryBg }}>
                                <h4 style={{ marginTop: "0px" }}><span>{iconhistory}</span>{e.Message}</h4>
                                <p style={{ marginTop: "0px" }}>{e.URL}</p>
                            </div></>
                        })
                    }

                </details>
            </div>
            
        </div>
    );


}
export default App;
