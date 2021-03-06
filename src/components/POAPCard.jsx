import React, { useCallback, useState, useEffect } from "react";

import { EVENT_TYPE } from "./../utils/constants";

import { usePOAPContract } from "./../hooks";

import { mintPOAP, fetchPOAPBalance } from "./../utils/helpers";

import { useContractKit } from "@celo-tools/use-contractkit";

var hdate = require("human-date");

function POAPCard({ data }) {
  const { address, connect, performActions } = useContractKit();

  const [ minted, setMinted ] = useState(false);

  const poapContract = usePOAPContract(
    address
  );

  const getPOAPBalance = useCallback(() => {
    const _getPOAPBalance = async () => {
      if (poapContract && address) {
        const balance = await fetchPOAPBalance(poapContract, address);
        setMinted(balance > 0 ? true : false);
      }
    };

    _getPOAPBalance();
  },  [poapContract, address]);

  useEffect(() => {
    getPOAPBalance();
  },  [poapContract, address]);

  const minter = useCallback(() => {
    const mintPOAPHelper = async () => {
      if (!address) await connect();
      await mintPOAP(performActions, poapContract, "data");
    };
    mintPOAPHelper();
  }, [poapContract]);

  return (
    <div className="col-xl-3 col-xxxl-3 col-lg-6 col-md-6 col-sm-12 mb-4">
      <div className="card w-100 p-0 shadow-xss border-0 rounded-lg overflow-hidden mr-1">
        <div className="card-image w-100 mb-3">
          <a
            href="default-course-details.html"
            className="position-relative d-block"
          >
            <img src={data?.media} alt="poap" className="w-100" />
          </a>
        </div>
        <div className="card-body pt-0">
          <h3 className="fw-700 font-xs mt-3 lh-28 mt-0">
            <a
              href="default-course-details.html"
              className="text-dark text-grey-900"
            >
              {data?.title}
            </a>
          </h3>
          <p>
            {data?.description
              ? data?.description
              : "lorem lorem ipsum ipsum dolor dolor lorem lorem ipsum ipsum dolor dolor lorem lorem ipsum ipsum dolor dolor lorem lorem ipsum ipsum dolor dolor"}
          </p>
          <span className="font-xsssss fw-700 px-2 mt-3 lh-32 text-uppercase rounded-lg ls-2 alert-light border d-inline-block text-primary mr-1">
            {EVENT_TYPE[data.event_type]}
          </span>

          <span className="font-xsssss fw-700 px-2 mt-3 lh-32 text-uppercase rounded-lg ls-2 alert-light border d-inline-block text-primary mr-1">
            {hdate.prettyPrint(data?.start_time)}
          </span>

          <span className="font-xsssss fw-700 px-2 mt-3 lh-32 text-uppercase rounded-lg ls-2 alert-light border d-inline-block text-primary mr-1">
            {data?.organizer}
          </span>

          <div>
            { minted ? (
              <button className="mt-4 rounded-xl text-white bg-current w125 p-2 lh-32 font-xsss text-center fw-500 d-inline-block disabled border-0">
                Minted
              </button>
            ) : (
              <button
                onClick={() => minter()}
                className="mt-4 rounded-xl text-white bg-current w125 p-2 lh-32 font-xsss text-center fw-500 d-inline-block border-0"
              >
                Mint
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default POAPCard;
