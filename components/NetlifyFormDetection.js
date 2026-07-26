export default function NetlifyFormDetection() {
  return (
    <div style={{ display: "none" }}>
      <form name="contact" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
        <input name="fullName" type="text" />
        <input name="email" type="text" />
        <input name="cruiseShip" type="text" />
        <input name="message" type="text" />
      </form>
      <form name="group-excursions" data-netlify="true">
        <input type="hidden" name="form-name" value="group-excursions" />
        <input name="firstName" type="text" />
        <input name="lastName" type="text" />
        <input name="email" type="text" />
        <input name="phone" type="text" />
        <input name="groupSize" type="text" />
        <input name="shipName" type="text" />
        <input name="arrivalDate" type="text" />
        <input name="destinations" type="text" />
        <input name="notes" type="text" />
      </form>
      <form name="travel-agent" data-netlify="true">
        <input type="hidden" name="form-name" value="travel-agent" />
        <input name="agencyName" type="text" />
        <input name="contactName" type="text" />
        <input name="email" type="text" />
        <input name="phone" type="text" />
        <input name="message" type="text" />
      </form>
      <form name="book-excursion" data-netlify="true">
        <input type="hidden" name="form-name" value="book-excursion" />
        <input name="fullName" type="text" />
        <input name="email" type="text" />
        <input name="preferredDate" type="text" />
        <input name="numberOfGuests" type="text" />
        <input name="excursionName" type="text" />
        <input name="destinationPort" type="text" />
      </form>
    </div>
  );
}
