import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./style/home.css";
import Loader from "../components/Loader";
import MainService from "../services/main-service";
import greenDot from "../assets/green-dot.svg";
import grayDot from "../assets/grey-dot.svg";
import isEmpty from "lodash/isEmpty";
import DEFAULT_NO_IMAGE from "../assets/default_icon_listing.png";

export const Home = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [product_list, setProductList] = useState([]);
  const DOC_URL_PATH =
    "/help/docs/sdk/latest/platform/company/catalog/#getProducts";
  const DOC_APP_URL_PATH =
    "/help/docs/sdk/latest/platform/application/catalog#getAppProducts";
  const { application_id } = useParams();
  useEffect(() => {
    isApplicationLaunch() ? fetchApplicationProducts() :
      fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setPageLoading(true);
    try {
      const { data } = await MainService.getAllProducts();
      setProductList(data.items);
      setPageLoading(false);
    } catch (e) {
      setPageLoading(false);
    }
  };

  const fetchApplicationProducts = async () => {

    setPageLoading(true);
    try {
      const { data } = await MainService.getAllApplicationProducts({
        application_id: application_id
      })
      setProductList(data.items);
      setPageLoading(false);
    } catch (e) {
      setPageLoading(false);
    }
  }

  const productProfileImage = (media) => {
    if (isEmpty(media)) {
      return DEFAULT_NO_IMAGE;
    }
    const profileImg = media.find((m) => m.type === "image");
    if (isEmpty(profileImg) || !profileImg.url) {
      return DEFAULT_NO_IMAGE;
    }
    return profileImg.url;
  };

  const getDocumentPageLink = () => {
    return "https://api.uat.fyndx1.de"
      .replace("api", "partners")
      .concat(isApplicationLaunch() ? DOC_APP_URL_PATH : DOC_URL_PATH);
  }

  const isApplicationLaunch = () => {
    return application_id ? true : false;
  }

  return (
    <>
      {pageLoading ? (
        <Loader />
      ) : (
        <div className="products-container">
          <div className="title">
            This is an example extension home page user interface.
          </div>

          <div className="section">
            <div className="heading">
              <span>Example Platform API</span> :{" "}
              <a href={getDocumentPageLink()} target="_blank">
                {isApplicationLaunch() ? 'getAppProducts' : 'getProducts'}
              </a>
            </div>
            <div className="description">
              This is an illustrative Platform API call to fetch the list of
              products in this company. Go to your extension folder’s
              ‘root/app/routes/’ directory to check how to call Platform API and
              start calling API you require.
            </div>
          </div>

          <div>
            {product_list.map((product, index) => {
              return (
                <div className="product-list-container flex-row" key={`product-${product.name}-${index}`}>
                  {product.is_active ? (
                    <img className="mr-r-12" src={greenDot} />
                  ) : (
                    <img className="mr-r-12" src={grayDot} />
                  )}
                  <div className="card-avatar mr-r-12">
                    <img src={productProfileImage(product.media)} alt="text" />
                  </div>
                  <div className="flex-column">
                    <div className="flex-row">
                      <div className="product-name" id={`product-name-${index}`} data-testid={`product-name-${index}`}>
                        {product.name}
                      </div>
                      <div className="product-item-code">|</div>
                      {product.item_code && (
                        <>
                          <span className="product-item-code">
                            Item Code:
                            <span
                              className="cl-RoyalBlue"
                              id={`product-item-code-${index}`}
                              data-testid={`product-item-code-${index}`}
                            >
                              {product.item_code}
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                    {product.brand && (
                      <div
                        className="product-brand-name"
                        id={`product-brand-name-${index}`}
                      >
                        {product.brand.name}
                      </div>
                    )}
                    {product.category_slug && (
                      <div
                        className="product-brand-name"
                        id={`product-category-slug-${index}`}
                      >
                        Category <span>: </span>{" "}
                        <span>{product.category_slug}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
