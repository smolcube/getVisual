import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

// components // modules
import ButtonIcon from '../Components/ButtonIcon';
import Feedback from '../Components/Feedback';
import newRequest from '../Utils/newRequest';


export default function DashTables() {
  const { state } = useParams();
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [rejectConfirmationModal, setRejectConfirmationModal] = useState(false);

  // Fetch package data based on the state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/dashboard/${state}`);
        setPackages(response.data.packages);
        console.log("Packages fetch is done!!!");
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchData();
  }, [state]);

  // Function to handle package acceptance
  const handleAccept = async (packageItem) => {
    setSelectedPackage(packageItem);
    setShowConfirmationModal(true);
  };

  // Function to handle package rejection
  const handleReject = async (packageItem) => {
    setSelectedPackage(packageItem);
    setRejectConfirmationModal(true);
  };

  const confirmAccept = async () => {
    try {
      console.log("confirmAccept")
    } catch (error) {
      console.error('Error accepting package:', error);
    }
  };

  const confirmReject = async () => {
    try {
      console.log("confirmReject")
    } catch (error) {
      console.error('Error rejecting package:', error);
    }
  };

  const cancelAccept = () => {
    setShowConfirmationModal(false); // Dismiss the accept confirmation modal on cancel
  };

  const cancelReject = () => {
    setRejectConfirmationModal(false); // Dismiss the reject confirmation modal on cancel
  };

  // Translate state based on its value
  let translatedState;
  if (state === "approved") {
    translatedState = "المقبولة";
  } else if (state === "rejected") {
    translatedState = "المرفوضة";
  } else {
    translatedState = "المعلقة";
  }

  const location = useLocation();
  const isPending = location.pathname === '/getVisual/dashboard/pending';

  return (
    <div className="posts-container">
      <div className="posts-container__table">
        <div className="posts-container__table--title">
          <h1> المنشورات {translatedState}</h1>
          <p>سِــجل التفاصيل</p>
        </div>
        <div className="posts-container__table--wrapper">
          {packages.map((packageItem) => (
            <React.Fragment key={packageItem._id}>
              <div className="posts-container__table--column1">
                {packageItem.user.username}
              </div>
              <div className="posts-container__table--column2">
                <Link to={`/getVisual/dashboard/:state/${packageItem._id}`}>
                  {packageItem.name}
                </Link>
              </div>
              {isPending ? (
                <div className="posts-container__table--column3">
                  <ButtonIcon
                    id='acceptBtn'
                    onClick={() => handleAccept(packageItem)}
                    ionicon="checkmark-circle-outline"
                  />
                  <ButtonIcon
                    id='rejectBtn'
                    onClick={() => handleReject(packageItem)}
                    ionicon="trash-outline"
                  />
                </div>
              ) : (
                <div>
                  <span>{packageItem.createdAt}</span>
                  <span>@Admin1</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Render the accept confirmation modal */}
      <Feedback isOpen={showConfirmationModal} onClose={cancelAccept}>
        <h3>تــأكيـد</h3>
        <p>هل تريد الموافقة على نشر هذه الخدمة؟</p>
        <ButtonIcon id='acceptBtn' onClick={confirmAccept} ionicon="checkmark-circle-outline" />
        <ButtonIcon id='cancelBtn' onClick={cancelAccept} ionicon="close-circle-outline" />
      </Feedback>
      {/* Render the reject confirmation modal */}
      <Feedback isOpen={rejectConfirmationModal} onClose={cancelReject}>
        <h3>تــأكيـد</h3>
        <p>هل تريد رفض نشر هذه الخدمة؟</p>
        <ButtonIcon id='rejectBtn' onClick={confirmReject} ionicon="trash-outline" />
        <ButtonIcon id='cancelBtn' onClick={cancelReject} ionicon="close-circle-outline" />
      </Feedback>
    </div>
  );
}