import React from "react";
import PublicLegalLayout from "./PublicLegalLayout";

const TermsAndConditions = () => {
    return (
        <PublicLegalLayout
            title="Terms and Conditions"
            otherPageLabel="Privacy Policy"
            otherPagePath="/privacy-policy"
        >
            <h2>1. Agreement</h2>
            <p>
                By accessing or using Ghar Sabha admin services and related applications, you agree to these Terms and
                Conditions. If you do not agree, please do not use the service.
            </p>

            <h2>2. Use of the service</h2>
            <p>
                The admin panel is intended for authorised personnel only. You are responsible for maintaining the
                confidentiality of your account credentials and for all activity under your account.
            </p>

            <h2>3. Acceptable use</h2>
            <ul>
                <li>Use the platform only for lawful purposes and in line with your organisation&apos;s policies.</li>
                <li>Do not attempt to gain unauthorised access to data, systems, or other users&apos; accounts.</li>
                <li>Do not interfere with or disrupt the integrity or performance of the service.</li>
            </ul>

            <h2>4. Content and data</h2>
            <p>
                Information displayed in the admin panel may include member, donation, event, and temple data. You must
                handle such data in accordance with applicable laws and your organisation&apos;s privacy obligations.
            </p>

            <h2>5. Changes</h2>
            <p>
                We may update these terms from time to time. Continued use after changes constitutes acceptance of the
                revised terms. The &quot;Last updated&quot; date at the top of this page will be revised when material
                changes are made.
            </p>

            <h2>6. Contact</h2>
            <p>For questions about these terms, contact your organisation administrator or support channel.</p>
        </PublicLegalLayout>
    );
};

export default TermsAndConditions;
