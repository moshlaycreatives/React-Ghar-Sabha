import React from "react";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import { endpoints } from "../../../apiEndpoints";

const DeleteTemple = ({ open, onClose, id, onDelete }) => {
    return (
        <DeleteConfirmationModal
            open={open}
            onClose={onClose}
            id={id}
            onDelete={onDelete}
            endpoint={endpoints.AdminAddTemple}
            title="Delete Temple"
            resourceName="Temple"
        />
    );
};

export default DeleteTemple;
