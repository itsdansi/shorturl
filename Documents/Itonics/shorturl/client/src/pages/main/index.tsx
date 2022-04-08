import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppService } from "../../services/app.service";
import "./index.css";
import { toast } from "react-toastify";

// let baseUrl = `${process.env.HOST}:${process.env.PORT}`;

export default function Index() {
  const [longUrl, setLongUrl] = useState("");
  const [result, setResult] = useState("");

  interface Result {
    fullUrl: string;
    shortUrl: string;
    clicks: number;
  }
  const [data, setData] = useState<Result[]>([]);

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

  useEffect(() => {
    async function fetch() {
      const result = await appService.fetch();
      setData(result);
    }
    fetch();
  }, [result]);

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center w-200 h-100">
        <div className="row">
          <div className="centering col-md-12 h-100">
            <form action="" className="mform" onSubmit={onSubmit}>
              <label htmlFor="">Enter your long URL here</label>
              <div>
                <input
                  type="text"
                  name="longUrl"
                  placeholder="https://www.youtube.com/channel/UCNU2Xe6kr6OJDxWGDXa66gQ"
                  id=""
                  onChange={(e) => setLongUrl(e.target.value)}
                  required
                />

                <button type="submit" className="urlButton">
                  Shorten
                </button>
              </div>
            </form>
            {result.length > 0 ? (
              <form action="" className="dashResultDiv mform" onSubmit={onCopy}>
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
          <div className="table-responsive-sm col-md-12 h-100 mt-5">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Original/Long URLs</th>
                  <th scope="col">Short URLs</th>
                  <th scope="col">Total clicks</th>
                </tr>
              </thead>
              <tbody>
                {data.map((val, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{val.fullUrl}</td>
                    <td>{val.shortUrl}</td>
                    <td>{val.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
