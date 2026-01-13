import { useGoogleLocationPicker } from "../../features/GoogleLocationPicker/useGoogleLocationPicker.jsx";

export { GoogleAddressPage };

function GoogleAddressPage() {
    const [GoogleAddressInput, GoogleMapBox] = useGoogleLocationPicker();

    return (
        <>
        <h2>Google Input From Hook</h2>
        {GoogleAddressInput}
        <h2>Google Map From Hook</h2>
        {GoogleMapBox}
        </>
    );
}
