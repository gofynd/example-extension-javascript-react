import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

import "./home.css";
import Loader from "../components/Loader";
import MainService from "../services/main-service";

export default function Home() {
  const [pageLoading, setPageLoading] = useState(false);
  const [applicationList, setApplicationList] = useState([]);
  const [allApplications, setAllApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setPageLoading(true);
    try {
      const { data } = await MainService.getAllApplications();
      setAllApplications(data.items);
      const temp = data.items.map((ele) => {
        ele.text = ele.name;
        ele.value = ele._id;
        ele.image = ele.logo;
        ele.logo = ele.image && ele.image.secure_url;
        return ele;
      });
      setApplicationList(temp);
      setPageLoading(false);
    } catch (e) {
      setPageLoading(false);
    }
  };

  function searchApplication(event) {
    let searchText = event.target.value;
    if (!searchText) {
      setApplicationList(allApplications.map((app) => app));
    } else {
      setApplicationList(
        allApplications.filter((item) => {
          return item.name.toLowerCase().includes(searchText.toLowerCase());
        })
      );
    }
  }

  return (
    <div className="fp-extension-landing-page">
      {pageLoading ? (
        <Loader />
      ) : (
        <div className="content">
          <Form>
            <Form.Group className="mb-3" controlId="SearchForm.ControlInput">
              <Form.Label className="fp-extension-saleschannel-title">
                Sales Channel
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Search Sales Channels"
                onChange={searchApplication}
              />
            </Form.Group>
          </Form>

          <div className="fp-extension-application-list">
            {applicationList.map((application) => {
              return (
                <div className="fp-extension-sales-channels-container">
                  <div className="fp-extension-app-box">
                    <div className="logo">
                      <img src={application.logo} alt="logo" />
                    </div>
                    <div className="line-1">{application.name}</div>
                    <div className="line-2">{application.domain.name}</div>
                    <div className="fp-extension-list-btn-cont"></div>
                  </div>
                  {applicationList.length % 3 === 2 && (
                    <div className="fp-extension-app-box hidden"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
