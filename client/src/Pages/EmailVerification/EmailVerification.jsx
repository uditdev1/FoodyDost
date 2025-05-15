import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../components/Hooks/useAuth.jsx';
import * as userService from "../../Services/userService.js";

function EmailVerification() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    async function mail_verification() {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');

        try {
            const data = await userService.mail_verification(id);
            if (data.success) {
                auth.setUser(data.data);
                setVerified(true);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
                toast.success("Email verified!");
            } else {
                setError(true);
                toast.error("Verification Error! - try again");
            }
        } catch (err) {
            setError(true);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        mail_verification();
    }, [location.search]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: Verification failed. Please try again.</div>;
    }

    return (
        <div>
            <h1>{verified ? "Email Verified Successfully!" : "Verification Failed"}</h1>
        </div>
    );
}

export default EmailVerification;