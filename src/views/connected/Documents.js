import React from 'react';

export default function Documents() {
  const urlSiteVitrine = process.env.REACT_APP_PUBLIC_HOSTNAME;

  return (
    <div className="fr-container fr-my-10w">
      <div className="fr-container fr-container--fluid">
        <h4>1) Pr&eacute;parer la validation de l&rsquo;ouverture du ou des poste(s)</h4>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/cir_45126.pdf"
              className="fr-link" target="blank" title="T&eacute;l&eacute;charger la circulaire">
              T&eacute;l&eacute;charger la circulaire (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              D&eacute;tails de la circulaire
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Mod%C3%A8le%20de%20d%C3%A9lib%C3%A9ration%20contrat%20de%20projet.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le mod&egrave;le de d&eacute;lib&eacute;ration">
              T&eacute;l&eacute;charger le mod&egrave;le de d&eacute;lib&eacute;ration pour l&rsquo;assembl&eacute;e d&eacute;lib&eacute;rative (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Document pour la cr&eacute;ation d&rsquo;un poste non permanent
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Modele_de_convention.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger la convention de subvention">
              T&eacute;l&eacute;charger le mod&egrave;le de convention de subvention (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Mod&egrave;le de convention de subvention avec la Banque des Territoires
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/ConventionMutualisationEPCI.pdf"
              // eslint-disable-next-line max-len
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le mod&egrave;le de convention de mutualisation de poste pour un EPCI">
              T&eacute;l&eacute;charger le mod&egrave;le de convention de mutualisation de poste pour un EPCI (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Mod&egrave;le de convention entre une Communaut&eacute; de commune et ses Communes membres
            </span>
          </p>
        </div>

        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Appel_a_candidatures_conseiller_numerique_FNE.pdf"
              className="fr-link"
              target="blank"
              rel="noreferrer noopener"
              title="T&eacute;l&eacute;charger l&rsquo;Appel &agrave; Manifestation d'Int&eacute;r&ecirc;t Num&eacute;rique
              &ldquo;France Num&eacute;rique Ensemble&rdquo;">
              T&eacute;l&eacute;charger l&rsquo;Appel &agrave; Manifestation d&rsquo;Int&eacute;r&ecirc;t Num&eacute;rique
              &ldquo;France Num&eacute;rique Ensemble&rdquo; (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Appel &agrave; manifestation d&rsquo;int&eacute;r&ecirc;t France Num&eacute;rique Ensemble pour les acteurs priv&eacute;s et publiques
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Appel_a_candidatures_conseiller_numeriques_coordinateurs.pdf"
              className="fr-link" target="blank"
              rel="noreferrer noopener"
              title="T&eacute;l&eacute;charger l&rsquo;appel &agrave; candidature - Conseiller num&eacute;rique Coordinateur">
              T&eacute;l&eacute;charger l&rsquo;appel &agrave; candidature - Conseiller num&eacute;rique Coordinateur (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Appel &agrave; candidatures - Conseiller num&eacute;rique Coordinateur
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Convention_36_mois.pdf"
              className="fr-link" target="blank"
              rel="noreferrer noopener"
              title="T&eacute;l&eacute;charger le mod&egrave;le de convention de subvention 36 mois">
              T&eacute;l&eacute;charger le mod&egrave;le de convention de subvention 36 mois (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Mod&egrave;le de convention de subvention avec la Banque des Territoires
            </span>
          </p>
        </div>
        <h4>2) Financement Conseiller num&eacute;rique</h4>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Panorama_subventions.pdf"
              className="fr-link" target="blank" title="T&eacute;l&eacute;charger le panorama de financement du dispositif Conseiller num&eacute;rique">
              T&eacute;l&eacute;charger le panorama de financement du dispositif Conseiller num&eacute;rique (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Panorama de financement du dispositif Conseiller num&eacute;rique
            </span>
          </p>
        </div>
        <h4>3) Pr&eacute;parer le recrutement de votre/vos Conseiller(s) num&eacute;rique(s)</h4>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/presentation-conseiller-numerique.pdf"
              className="fr-link" target="blank" title="T&eacute;l&eacute;charger la fiche conseiller num&eacute;rique">
              T&eacute;l&eacute;charger la fiche conseiller num&eacute;rique (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Pr&eacute;sentation des activit&eacute;s du Conseiller Num&eacute;rique France Services
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Articulation_des_dispositifs_Pass_numeriques_et_Conseillers_numeriques_France_Services.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le document articulation des dispositifs">
              T&eacute;l&eacute;charger le document d&rsquo;articulation des dispositifs (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Ce document pr&eacute;sente l&rsquo;articulation des dispositifs Pass num&eacute;riques et Conseillers num&eacute;riques France Services
            </span>
          </p>
        </div>

        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Guide%20employeur%20public.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le guide de l&rsquo;employeur - Public">
              T&eacute;l&eacute;charger le guide employeur (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              D&eacute;tails du dispositif pour la structure accueillante publique
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Guide%20employeur%20prive.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le guide de l&rsquo;employeur - Priv&eacute;">
              T&eacute;l&eacute;charger le guide employeur (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              D&eacute;tails du dispositif pour la structure accueillante (entreprises et associations)
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Fiche%20de%20poste%20type.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger la fiche de poste type">
              T&eacute;l&eacute;charger la fiche de poste type (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Fiche avec d&eacute;tails de l&rsquo;offre, des missions et des tâches
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Contrat%20de%20projet%20type.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le contrat de projet type">
              T&eacute;l&eacute;charger le mod&egrave;le de contrat de projet (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Contrat de travail &agrave; dur&eacute;e d&eacute;termin&eacute;e
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/CDD_type_structures_privees.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le CDD type structures priv&eacute;es">
              T&eacute;l&eacute;charger le mod&egrave;le de contrat de projet (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Contrat de travail &agrave; dur&eacute;e d&eacute;termin&eacute;e pour les structures priv&eacute;es
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/CDD_18_mois_SA_privees.docx"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le mod&egrave;le CDD de 18 mois">
              T&eacute;l&eacute;charger le mod&egrave;le CDD (docx)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Contrat de travail &agrave; dur&eacute;e d&eacute;termin&eacute;e de 18 mois pour les structures priv&eacute;es
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/CDI_SA_privees.docx"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le mod&egrave;le CDI">
              T&eacute;l&eacute;charger le mod&egrave;le CDI (docx)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Contrat de travail &agrave; dur&eacute;e ind&eacute;termin&eacute;e pour les structures priv&eacute;es
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Guide%20d%27entretien.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le guide d'entretien">
              T&eacute;l&eacute;charger le guide d&rsquo;entretien (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Pr&eacute;conisations pour l&rsquo;entretien du candidat
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Aidants_Connect_x_CNFS.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger la note Aidants Connect &amp; CnFS">
              T&eacute;l&eacute;charger la note Aidants Connect &amp; CnFS (pdf)
            </a>
          </p>
        </div>
        <h4>4) Pr&eacute;parer l&rsquo;arriv&eacute;e de votre conseiller num&eacute;rique</h4>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/les-conseils-pour-bien-demarrer.pdf"
              // eslint-disable-next-line max-len
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le kit &laquo;Bien d&eacute;marrer ma mission&raquo;">
              T&eacute;l&eacute;charger le kit &laquo;Bien d&eacute;marrer ma mission&raquo; &agrave; remettre au(x) Conseiller(s) (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Ce document a pour objet de faciliter l&rsquo;entr&eacute;e en poste des Conseillers num&eacute;riques France Services, <br className="br-lg" />
              et contient de nombreuses informations en lien avec leur d&eacute;but d&rsquo;activit&eacute;&nbsp;:&nbsp;outils, r&eacute;seaux, parcours, etc.
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/parcours_et_integration_des_CnFS.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le parcours et int&eacute;gration">
              T&eacute;l&eacute;charger le document sur le parcours des CnFS (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Ce document pr&eacute;sente le parcours, l&rsquo;int&eacute;gration et les missions des Conseillers num&eacute;riques France Services
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Les_outils_des_CnFS.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger la pr&eacute;sentation des outils">
              T&eacute;l&eacute;charger la pr&eacute;sentation des outils des CnFS (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Ce document pr&eacute;sente l&rsquo;espace COOP et les outils mis &agrave; disposition aux Conseillers num&eacute;riques France Services
            </span>
          </p>
        </div>
        <h4>5) &Eacute;l&eacute;ments de communication</h4>
        <div className="fr-grid-row">
          <p>
            <a href={`${urlSiteVitrine}/kit-communication`}
              className="fr-link" target="blank" rel="noreferrer noopener" title="kit de communication V2">
              kit de communication V2
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Acc&eacute;der au kit de communication&nbsp;:&nbsp;logos, charte graphique, gabarits, mod&egrave;le de carte de visite
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/Flyer_CNFS.pdf"
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le flyer">
              T&eacute;l&eacute;charger le flyer (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Ce flyer pr&eacute;sente le dispositif Conseiller num&eacute;rique France Services
            </span>
          </p>
        </div>
        <h4>6) Accompagner les Conseillers num&eacute;riques France Services dans leurs missions</h4>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/guide-d-utilisation-de-l-outil-de-suivi-d-activite.pdf"
              // eslint-disable-next-line max-len
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger le guide d&rsquo;utilisation de l&rsquo;outil de suivi d&rsquo;activit&eacute;">
              T&eacute;l&eacute;charger le guide d&rsquo;utilisation de l&rsquo;outil de suivi d&rsquo;activit&eacute;
              des Conseillers num&eacute;riques France Services (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Ce guide est destin&eacute; &agrave; vous accompagner dans l&rsquo;utilisation de l&rsquo;outil de suivi et de pilotage <br className="br-lg" />
              de l&rsquo;activit&eacute; des Conseillers num&eacute;riques France Services.
            </span>
          </p>
        </div>
        <div className="fr-grid-row">
          <p>
            <a href="https://cdn.conseiller-numerique.gouv.fr/CNFS_x_demarches_administrative.pdf"
              // eslint-disable-next-line max-len
              className="fr-link" target="blank" rel="noreferrer noopener" title="T&eacute;l&eacute;charger la note &laquo;&nbsp; Conseillers num&eacute;riques, structures d&rsquo;accueil : comment accompagner les usagers dans leurs d&eacute;marches administratives en ligne ?&nbsp;&raquo;">
              T&eacute;l&eacute;charger la note &laquo;&nbsp; Conseillers num&eacute;riques, structures d&rsquo;accueil&nbsp;:
                comment accompagner les usagers dans leurs d&eacute;marches administratives en ligne&nbsp;?&nbsp;&raquo; (pdf)
            </a>
            <span className="fr-footer__bottom-link" style={{ display: 'block' }}>
              Cette note propose des pistes aux Conseillers num&eacute;riques et &agrave; leurs employeurs pour accueillir les demandes
              d&rsquo;accompagnement des usagers aux d&eacute;marches en ligne, notamment ceux en situation de rupture
              d&rsquo;acc&egrave;s aux droits, dans le respect de l&rsquo;AMI et en compl&eacute;mentarit&eacute; avec le r&eacute;seau
              des agents France Services.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
