import React from 'react';

function InscriptionFormation() {
  const url = process.env.REACT_APP_FRANCE_COMPETENCES_HOSTNAME;
  const urlPix = process.env.REACT_APP_PIX_CERTIFIER_HOSTNAME;
  const urlAide = process.env.REACT_APP_AIDE_HOSTNAME;

  return (
    <div className="fr-container fr-my-10w">
      <div className="fr-container fr-container--fluid">
        <h3>Pr&eacute;sentation de l&rsquo;offre de formation des Conseillers num&eacute;riques</h3>
        <div className="fr-grid-row">
          <p>Merci de lire ce message si vous d&eacute;sirez inscrire votre Conseiller num&eacute;rique en formation&nbsp;:</p>
          <p>Le march&eacute; public initial portant sur la formation des Conseillers num&eacute;riques est arriv&eacute; &agrave; son terme en
            d&eacute;but d&rsquo;ann&eacute;e 2023. Un nouveau march&eacute; public de formation sera prochainement mis en place et permettra
            de relancer des sessions de formation d&egrave;s la rentr&eacute;e 2023.
          </p>
          <p>Nous vous communiquerons d&egrave;s que possible les contacts des organismes de formation retenus dans le cadre de ce nouveau march&eacute; ainsi
            que les nouvelles modalit&eacute;s d&rsquo;inscription et d&rsquo;organisation de la formation.
          </p>
          <p>Nous vous rappelons que la formation initiale reste obligatoire pour tous les conseillers num&eacute;riques qui ne l&rsquo;auraient pas suivi.
             Cependant, une certaine souplesse est accord&eacute;e aux structures souhaitant recruter de nouveaux conseillers num&eacute;riques d&rsquo;ici
             la reprise des sessions de formation. Ces derniers auront la possibilit&eacute; de d&eacute;buter leurs missions sur le terrain dans
             l&rsquo;attente du retour des formations.
          </p>
          <p>
            Enfin, pour les demandes de financement des seconds parcours de formation, vous trouverez plus d&rsquo;informations sur&nbsp;
            <a href={urlAide + '/article/qui-assure-la-prise-en-charge-du-financement-dun-second-parcours-de-formation-42n98h/' }
              target="blank" rel="noreferrer noopener" title="Qui assure la prise en charge du financement d&rsquo;un second parcours de formation ?">
               l&rsquo;article de la FAQ d&eacute;di&eacute;
            </a>.
          </p>
        </div>

        <div className="fr-grid-row">
          <h4>Une formation certifiante pour l&rsquo;exercice de missions professionnelles dans le domaine de la m&eacute;diation num&eacute;rique</h4>
          <p>
            Chaque Conseiller num&eacute;rique (conum) commence son activit&eacute; par un parcours de formation certifiante
            dont le coût est pris en charge par l&rsquo;&Eacute;tat*.
            En tant que structure d&rsquo;accueil, vous vous engagez &agrave; laisser partir le Conseiller recrut&eacute; en formation, dans un
            d&eacute;lai de 15 jours maximum apr&egrave;s signature de son contrat de travail.
          </p>
          <p>
            <em>
              * Hors &eacute;ventuels frais de d&eacute;placement du candidat pendant sa formation ou pour rejoindre le lieu d&rsquo;examen pour
              sa certification, &agrave; la charge de l&rsquo;employeur.
              Pour les structures d&rsquo;accueil priv&eacute;es, une prise en charge de ces frais peut &ecirc;tre demand&eacute;e &agrave; l&rsquo;OPCO de
              r&eacute;f&eacute;rence.
            </em>
          </p>
          <p>
            Cette formation se d&eacute;roule durant les premiers mois de son contrat, selon un calendrier et dans un volume horaire adapt&eacute;
            aux comp&eacute;tences et connaissances de chaque apprenant&nbsp;.
            L&rsquo;organisme de formation, retenu par march&eacute; public par l&rsquo;Agence nationale de la coh&eacute;sion des territoires
            (ANCT), proc&egrave;de &agrave; un test de positionnement pour d&eacute;terminer l&rsquo;inscription dans un de ces parcours.
          </p>
          <p>
          Les missions du Conseiller num&eacute;rique sont d&rsquo;accompagner les citoyens dans un large spectre d&rsquo;usages
          num&eacute;riques du quotidien. Ils sont form&eacute;s &agrave; un m&eacute;tier, ce qui implique une formation dense traitant
          un grand nombre de th&eacute;matiques qui leur permettront de concevoir des programmes d&rsquo;action en ad&eacute;quation
          avec les besoins des usagers de leur structure d&rsquo;accueil. C&rsquo;est pourquoi il ne s&rsquo;agit pas simplement de
          proposer une formation &agrave; l&rsquo;accompagnement aux d&eacute;marches administratives, mais d&rsquo;offrir la possibilit&eacute;
          de &laquo;&nbsp;faire avec&nbsp;&raquo; et non de faire &laquo;&nbsp;&agrave; la place&nbsp;&raquo; de l&rsquo;usager.
          Le cadre du plan France Relance permet de proposer une mesure de formation permettant aux Conseillers num&eacute;riques de monter en
          comp&eacute;tences et de pr&eacute;parer une insertion durable dans le secteur professionnel de la m&eacute;diation num&eacute;rique.
          Pour les structures d&rsquo;accueil, l&rsquo;obtention des deux certifications par les Conseillers num&eacute;riques est un gage de qualit&eacute;
          pour leurs futures interventions aupr&egrave;s des usagers et participe &agrave; l&rsquo;essor de leurs projets en mati&egrave;re de lutte contre
          l&rsquo;exclusion num&eacute;rique. Pour cette raison,&nbsp;
            <a href={urlAide + '/article/la-presence-en-formation-est-elle-obligatoire-1db4moy/?bust=1649067275166'} target="blank" rel="noreferrer noopener">
              l&rsquo;assiduit&eacute; en formation
            </a> est une obligation des Conseillers num&eacute;riques et la structure d&rsquo;accueil est tenue de favoriser
          cette obligation. Le non-respect de cet engagement inscrit dans l&rsquo;appel &agrave; manifestation d&rsquo;int&eacute;r&ecirc;t
          constitue un motif de remise en cause de la subvention vers&eacute;e &agrave; la structure.
          </p>
          <p>
            La formation pr&eacute;pare :
            <ul>
              <li>
                &agrave; l&rsquo;examen du&nbsp;
                <a href={url} target="blank" rel="noreferrer noopener">
                  premier certificat de comp&eacute;tences professionnelles : &laquo;&nbsp;Accompagner diff&eacute;rents publics vers l&rsquo;autonomie
                  dans les usages des technologies, services et m&eacute;dias num&eacute;riques&nbsp;&raquo; du titre professionnel &laquo;&nbsp;
                  Responsable d&rsquo;espace de m&eacute;diation num&eacute;rique&nbsp;&raquo;
                </a>.&nbsp;
                <em>
                  N.B.&nbsp;: un Conseiller d&eacute;j&agrave; titulaire du CCP1 ou du titre professionnel lors de son recrutement peut
                  &ecirc;tre&nbsp;
                  <a href={urlAide + '/article/un-conseiller-numerique-peut-il-etre-dispense-de-la-formation-initiale-obligatoire-ywgzld/'}
                    target="blank" rel="noreferrer noopener" >
                    exempt&eacute;
                  </a> de formation initiale.
                </em>
              </li>
              <li>
                &agrave; la&nbsp;<a href={urlPix} target="blank" rel="noreferrer noopener">certification PIX</a>&nbsp;
                qui atteste de la maîtrise des comp&eacute;tences num&eacute;riques par le candidat.
              </li>
            </ul>
          </p>
          <p>
            L&rsquo;&eacute;chec &agrave; l&rsquo;un ou l&rsquo;autre de ces examens ne remet pas en cause ni le contrat de travail, ni la convention de
            subvention. En ce cas, la structure d’accueil est invit&eacute;e &agrave; accompagner le salari&eacute; &agrave; une nouvelle pr&eacute;sentation
            de l&rsquo;examen. En revanche, la pr&eacute;sentation aux deux examens constitue une obligation pour chaque Conseiller num&eacute;rique
            et pour sa structure d&rsquo;accueil employeur.
          </p>
        </div>

      </div>
    </div>

  );
}

export default InscriptionFormation;
