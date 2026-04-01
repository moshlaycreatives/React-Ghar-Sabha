import React from "react";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import { endpoints } from "../../../apiEndpoints";




const DeleteBanner = ({ open, onClose, id, onDelete }) => {
    return (
        <DeleteConfirmationModal
            open={open}
            onClose={onClose}
            id={id}
            onDelete={onDelete}
            endpoint={endpoints.AdminEventBanner}
            title="Delete Banner"
            resourceName="Banner"
        />
    );
};

export default DeleteBanner;
