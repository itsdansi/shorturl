import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppService } from "../../services/app.service";
import "./index.css";
import { toast } from "react-toastify";

export default function Index() {
  const [longUrl, setLongUrl] = useState("");
  const [result, setResult] = useState("");

  const appService = new AppService();
  const navigate = useNavigate();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    const response = await appService.shortUrl(longUrl);

    if (response?.success) {
      setResult(response.data);
    } else {
      toast.warning("Somting went wrong");
    }
  };

  const onCopy = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center w-200 h-100">
        <div className="row">
          <div className="centering col-md-12 h-100">
            <form action="" className="form" onSubmit={onSubmit}>
              <label htmlFor="">Enter your long URL here</label>
              <div>
                <input
                  type="text"
                  name="longUrl"
                  id=""
                  placeholder="https://www.youtube.com/channel/UCNU2Xe6kr6OJDxWGDXa66gQ"
                  onChange={(e) => setLongUrl(e.target.value)}
                  required
                />

                <button type="submit" className="urlButton">
                  Shorten
                </button>
              </div>
            </form>
            {result.length > 0 ? (
              <form action="" className="resultDiv form" onSubmit={onCopy}>
                <div>
                  <input
                    type="text"
                    name="longUrl"
                    id=""
                    value={result.trim()}
                    disabled
                  />
                  <button type="submit" className="resultButton">
                    Copy
                  </button>
                </div>
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <footer className="mt-auto d-flex align-items-center justify-content-center">
        <label htmlFor="">
          Pro tips: Login to the site to save/track your links
        </label>
      </footer>
    </>
  );
}
