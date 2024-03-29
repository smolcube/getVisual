import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

// components // modules
import ButtonCTA from '../Components/ButtonCTA';
import ButtonIcon from '../Components/ButtonIcon';
import Modal from '../Components/Modal';
import newRequest from '../Utils/newRequest';

export default function DashTables() {
  // Get the state parameter from the URL using useParams
  const { state } = useParams();

  // State variables to manage data and UI state
  const [packages, setPackages] = useState([]); // Array to store fetched packages
  const [selectedPackage, setSelectedPackage] = useState(null); // Selected package for modals
  const [acceptModal, showAcceptModal] = useState(false); // accept confirmation modal
  const [rejectModal, setRejectModal] = useState(false); // confirmation modal
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(true); // loading state


    // Get current location information
    const location = useLocation();
    const isPending = location.pathname === '/getVisual/dashboard/pending'; // Check if path indicates pending state
    const isApproved = location.pathname === '/getVisual/dashboard/approved'; // Check if path indicates pending state

    
  // Fetch package data based on the state
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isApproved) {
          // Add query parameter for approved packages ONLY when state is approved
          const response = await newRequest.get(`/dashboard/${state}`, { params: { state: true } });
          setPackages(response.data.packages);
          console.log("APPROVED Packages fetch is done!!!");
        } 
        else {
          // Fetch for other states without the query parameter
          const response = await newRequest.get(`/dashboard/${state}`);
          setPackages(response.data.packages);
          console.log("Packages fetch is done!!!");
        }
      console.log(packages);
      setLoading(false);

      } 
      catch (error) {
        console.error('Error fetching packages:', error);
        setLoading(true); // Keep loading true in case of errors
      }
    };
  
    fetchData();
  }, [state]);

  // Function to handle package acceptance (clicking accept button)
  const handleAccept = async (packageItem) => {
    setSelectedPackage(packageItem); // Set the selected package
    showAcceptModal(true); // Open the accept confirmation modal
    setModalType('accept');
  };

  // Function to handle package rejection (clicking reject button)
  const handleReject = async (packageItem) => {
    setSelectedPackage(packageItem); // Set the selected package
    setRejectModal(true); // Open the reject confirmation modal
    setModalType('reject');
  };

  // Function to confirm package acceptance (clicking 'نعم' in accept modal)
  const confirmAccept = async () => {
    try {
      await newRequest.put(`/dashboard/${state}/accept/${selectedPackage._id}`);

      showAcceptModal(false);

    } catch (error) {
      console.error('Error accepting package:', error);
    }
  };
  // Function to confirm package rejection (clicking 'نعم' in reject modal)
  const confirmReject = async () => {
    try {
      await newRequest.put(`/dashboard/${state}/reject/${selectedPackage._id}`);

      setRejectModal(false);


    } catch (error) {
      console.error('Error rejecting package:', error);
    }
  };

  // Function to close accept confirmation modal
  const cancelAccept = () => {
    showAcceptModal(false);
  };

  // Function to close reject confirmation modal
  const cancelReject = () => {
    setRejectModal(false);
  };

  // Translate state value to Arabic text
  let translatedState;
  if (state === "approved") {
    translatedState = "المقبولة";
  } else if (state === "rejected") {
    translatedState = "المرفوضة";
  } else {
    translatedState = "المعلقة";
  }


  // Render the component based on loading state and data availability
  return (
    <div className="posts-container">
    {loading ? (
      <div>Loading....</div>
    ) : (
      <div className="posts-container__table">
        <div className="posts-container__table--title">
          <h1> المنشورات {translatedState}</h1>
          <p>سِــجل التفاصيل</p>
        </div>
        <div className="posts-container__table--wrapper">
          {packages
          .map((packageItem) => (
              <React.Fragment key={packageItem._id}>
                <div className="posts-container__table--column1">
                  {packageItem.user.username}
                </div>
                <div className="posts-container__table--column2">
                  <Link to={`/getVisual/dashboard/${state}/${packageItem._id}`}>
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
                    <span>Admin123</span>
                  </div>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    )}

{selectedPackage && (
  <Modal isOpen={acceptModal} onClose={cancelAccept}>
    <h3>تــأكيـد</h3>
    <p>هل تريد الموافقة على نشر هذه الخدمة؟</p>
    <Link to={`/getVisual/dashboard/${state}/${modalType}/${selectedPackage._id}`}>
      <ButtonCTA id='accept' class='pri-cta cta' name='نعم' function={confirmAccept} />
    </Link>
  </Modal>
)}

{selectedPackage && (
  <Modal isOpen={rejectModal} onClose={cancelReject}>
    <h3>تــأكيـد</h3>
    <p>هل تريد رفض نشر هذه الخدمة؟</p>
    <Link to={`/getVisual/dashboard/${state}/${modalType}/${selectedPackage._id}`}>
      <ButtonCTA id='reject' class='pri-cta cta' name='نعم' function={confirmReject} />
    </Link>
  </Modal>
)}
    </div>
  );
}