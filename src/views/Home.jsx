import React, { useState, useEffect } from "react";

import "./style/home.css";
import Loader from "../components/Loader";
import { Input } from "@gofynd/nitrozen-react";
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
    <>
      {pageLoading ? (
        <Loader />
      ) : (
        <div className="application-container">

          <div className="saleschannel-title">Sales Channel</div>

          <div className="search-box">
            <Input
              showSearchIcon
              placeholder='search sales channels'
              disabled={ Object.keys(allApplications).length === 0 ? true : false }
              onChange={searchApplication}
            />
          </div>
          
          <div className="sales-channels-container">
            {applicationList.map((application) => {
              return (
                  <div className="app-box">

                    <div className="logo">
                      <img src={application.logo ? application.logo : "https://platform.fynd.com/public/admin/assets/pngs/fynd-store.png"} alt="logo" />
                    </div>

                    <div className="line-1">{application.name}</div>

                    <div className="line-2">{application.domain.name}</div>
                  </div>
              );
            })}
            {applicationList.length % 3 === 2 && (
              <div className="app-box hidden"></div>
            )}
          </div>
          
        </div>
      )}
    </>
  );
}
