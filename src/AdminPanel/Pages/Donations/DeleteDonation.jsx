import React from "react";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import { endpoints } from "../../../apiEndpoints";

const DeleteDonation = ({ open, onClose, id, onDelete }) => {
    return (
        <DeleteConfirmationModal
            open={open}
            onClose={onClose}
            id={id}
            onDelete={onDelete}
            endpoint={endpoints.AdminDonations}
            title="Delete Donation"
            resourceName="Donation"
        />
    );
};

export default DeleteDonation;
