import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InvitationActions } from "../../../../actions/invitationActions";

export default function InvitationAdmin() {
  const dispatch = useDispatch();
  const valideEmail = new RegExp(
    /^[a-zA-Z0-9-._]+@[a-zA-Z0-9-._]{2,}[.][a-zA-Z]{2,3}$/
  );
  const [email, setEmail] = useState("");
  const [activeMessage, setActiveMessage] = useState(false);

  const sendInvitation = () => {
    if (valideEmail.test(email)) {
      // dispatch(InvitationActions.inviteAccountAdmin(email));
      setActiveMessage(false);
      window.scrollTo(0, 0);
    } else {
      setActiveMessage(true);
    }
  };

  return (
    <div style={{ width: "50%" }}>
      <div className="fr-my-3w">
        <label className="fr-label">Email</label>
        <input
          className="fr-input"
          type="email"
          id="text-input-text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email && !valideEmail.test(email) && activeMessage && (
          <div className="invalid">
            Le format de l&rsquo;email saisi est invalide.
          </div>
        )}
      </div>
      <button
        onClick={() => setEmail("")}
        disabled={email.length === 0 ? "disabled" : ""}
        className="fr-btn"
      >
        Annuler
      </button>
      <button
        style={{ float: "right" }}
        className="fr-btn"
        disabled={!valideEmail.test(email) ? "disabled" : ""}
        onClick={sendInvitation}
      >
        Envoyer
      </button>
    </div>
  );
}
