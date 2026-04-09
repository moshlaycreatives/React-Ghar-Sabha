import React from "react";
import PublicLegalLayout from "./PublicLegalLayout";

const PrivacyPolicy = () => {
    return (
        <PublicLegalLayout
            title="Privacy Policy"
            otherPageLabel="Terms and Conditions"
            otherPagePath="/terms-and-conditions"
        >
            <h2>1. Overview</h2>
            <p>
                This Privacy Policy describes how Ghar Sabha-related admin tools may process information when authorised
                users access the dashboard. Replace this text with your organisation&apos;s official policy as approved by
                legal counsel.
            </p>

            <h2>2. Information we process</h2>
            <p>Depending on how your deployment is configured, the system may process categories such as:</p>
            <ul>
                <li>Account identifiers (for example, email) used for authentication.</li>
                <li>Operational data you enter or manage (members, donations, events, temples, messages).</li>
                <li>Technical data such as device or browser type needed for security and reliability.</li>
            </ul>

            <h2>3. How we use information</h2>
            <p>Typical purposes include providing the service, security, troubleshooting, and meeting legal obligations.</p>

            <h2>4. Sharing</h2>
            <p>
                Data may be shared with service providers that host or support the application, only as needed to run
                the service and subject to appropriate agreements. Describe any third parties and transfers applicable to
                your deployment.
            </p>

            <h2>5. Retention</h2>
            <p>
                Retention periods depend on your organisation&apos;s rules and legal requirements. Document them here for
                your users.
            </p>

            <h2>6. Your rights</h2>
            <p>
                Depending on jurisdiction, users may have rights to access, correct, delete, or restrict processing of
                personal data. Explain how requests can be made for your organisation.
            </p>

            <h2>7. Contact</h2>
            <p>For privacy questions, provide a contact email or process for your organisation.</p>
        </PublicLegalLayout>
    );
};

export default PrivacyPolicy;
