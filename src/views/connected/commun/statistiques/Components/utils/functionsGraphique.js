export function setCategoriesStatistiques(donneesStats, typeGraphique, labelsCorrespondance) {

  let categories = [];
  donneesStats.forEach(element => {
    let libelle = labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element.nom;
    if (typeGraphique === 'bar') {
      categories.push(`${libelle}&nbsp;&nbsp;&nbsp;&nbsp;<b>${element.valeur}</b>&nbsp;&nbsp;${element.percent}%`);
    } else {
      categories.push(libelle);
    }
  });

  return categories;
}

export function setStatistiquesGraphique(typeGraphique, largeurGraphique, hauteurGraphique, margeGaucheGraphique, margeDroiteGraphique) {
  const type = typeGraphique === 'stacked' ? 'bar' : typeGraphique;

  let chart = {
    width: largeurGraphique,
    height: hauteurGraphique,
    marginLeft: margeGaucheGraphique,
    marginRight: margeDroiteGraphique,
    spacing: [0, 0, 0, 0],
    fill: '#fff',
    style: {
      fontFamily: 'Marianne',
      marginBottom: 150,
      backgroundColor: '#fff',
    },
    container: {
      onclick: null
    }
  };

  if (typeGraphique !== 'xy') {
    chart.type = type;
  } else {
    chart.zoomType = type;
  }

  return chart;
}

export function setStatistiquesTitre(optionTitre, margeTitre, placementTitre, optionResponsive) {

  let titre = {
    text: optionTitre,
    margin: margeTitre,
    x: placementTitre,
    y: 13,
    width: optionResponsive ? 300 : 400,
    align: 'left',
    style: {
      color: '#1e1e1e',
      fontSize: '16px',
      fontWeight: 'bold',
      lineHeight: '24px'
    }
  };

  return titre;
}

export function setStatistiquesDonnees(donneesStats, typeGraphique, couleursGraphique, labelsCorrespondance) {
  let donnees = {};

  let cumul = 0;
  let valeurs = [];
  let valeursCumul = [];

  donneesStats.forEach((element, i) => {
    if (typeGraphique === 'xy') {
      cumul += element.valeur;
      valeurs.push(element.valeur);
      valeursCumul.push(cumul);
    } else if (typeGraphique === 'stacked') {
      valeurs.push({
        name: labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element.nom,
        data: [element.valeur],
        color: couleursGraphique[i],
        borderColor: '#fff',
        borderWidth: 1,
      });
    } else if (typeGraphique === 'pie') {
      //Ne pas afficher la valeur 0 dans le camembert

      if (element.valeur === 0) {
        valeurs.push({
          name: labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element.nom,
          y: element.valeur,
          visible: false
        });
      } else {
        valeurs.push({
          name: labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element.nom,
          y: element.valeur,
          color: couleursGraphique[i],
          visible: true
        });
      }
    } else {
      valeurs.push({
        name: labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element.nom,
        y: element.valeur,
        color: couleursGraphique[i]
      });
    }
  });

  if (typeGraphique === 'stacked') {

    if (valeurs[0].data[0] >= 8 && valeurs[valeurs.length - 1].data[0] >= 8) {
      valeurs[0].borderRadiusTopLeft = '100%';
      valeurs[0].borderRadiusTopRight = '100%';
      valeurs[valeurs.length - 1].borderRadiusBottomLeft = '100%';
      valeurs[valeurs.length - 1].borderRadiusBottomRight = '100%';
    }
    donnees = valeurs;
  } else if (typeGraphique === 'xy') {
    donnees = [{
      name: 'Accompagnements par mois',
      type: 'column',
      yAxis: 1,
      data: valeurs,
      color: '#169b62',
    }, {
      name: 'Accompagnements cumul&eacute;s',
      data: valeursCumul,
      lineWidth: 5,
      color: '#f7a35c',
      marker: {
        enabled: true,
        radius: 6
      },
    }];
  } else {
    donnees = [{
      data: valeurs,
    }];
  }

  return donnees;
}

export function setStatistiquesLegende(typeGraphique, isReoriente, optionResponsive, optionLegend) {
  let legende = { };

  switch (typeGraphique) {

    case 'bar':

      legende = {
        enabled: false
      };

      break;

    case 'pie':
      if (isReoriente) {
        const x = -260;
        legende = {
          title: optionResponsive ? {} : {
            text: '<span>Lieux</span>',
            style: {
              fontFamily: 'Marianne',
              fontWeight: 'bold',
              fontSize: '16px',
              color: '#1e1e1e',
            }
          },
          itemMarginBottom: 5,
          symbolPadding: 12,
          verticalAlign: optionResponsive ? 'bottom' : 'right',
          align: optionResponsive ? 'left' : 'right',
          x: optionResponsive ? 0 : x,
          y: optionResponsive ? 0 : 65,
          width: optionResponsive ? '100%' : '20%',
          maxHeight: '450px',
          itemStyle: {
            color: '#1e1e1e',
            fontWeight: 400,
            lineHeight: '20px',
          },
          itemHoverStyle: {
            color: '#1e1e1e'
          },
        };
      } else {
        const x = 0;
        legende = {
          ...optionLegend,
          symbolPadding: 12,
          itemMarginBottom: 5,
          align: 'left',
          x: optionLegend ? x : -10,
          y: 0,
          width: '100%',
          itemStyle: {
            color: '#1e1e1e',
            fontWeight: 400,
            lineHeight: '20px'
          },
          itemHoverStyle: {
            color: '#1e1e1e'
          },
        };
      }
      break;

    case 'column':

      legende = {
        enabled: false
      };

      break;

    case 'xy':

      legende = {
        symbolPadding: 12,
        itemMarginBottom: 5,
        align: 'left',
        itemStyle: {
          color: '#1e1e1e',
          fontWeight: 400,
        },
        itemHoverStyle: {
          color: '#1e1e1e'
        },
      };

      break;

    case 'stacked':

      legende = {
        symbolPadding: 12,
        reversed: true,
        align: 'left',
        x: -10,
        y: -60,
        itemMarginBottom: 5,
        itemStyle: {
          color: '#1e1e1e'
        },
        itemHoverStyle: {
          color: '#1e1e1e'
        },
        navigation: {
          enabled: false,
        },
        useHTML: true,
        labelFormatter: function() {
          if (this.data !== []) {
            //titre-legende-bis
            if (this.chart.title.textStr === 'Statut usagers') {
              return '<span class="titre-legende-bis">' + this.name + ' </span><span class="valeur-legende">' + this.options.data[0] + '%</span>';
            } else {
              return '<span class="titre-legende">' + this.name + ' </span><span class="valeur-legende">' + this.options.data[0] + '%</span>';
            }

          } else {
            return this.name;
          }
        }
      };

      break;

    default:
      break;
  }

  return legende;
}

export function setStatistiquesAxeY(typeGraphique) {
  let axeY = { };

  switch (typeGraphique) {

    case 'bar':

      axeY = {
        title: {
          text: null
        },
        labels: {
          enabled: false
        },
        gridLineWidth: 0,
      };

      break;

    case 'pie':

      axeY = null;

      break;

    case 'column':
      axeY = {
        title: {
          text: null
        },
        tickWidth: 1,
        tickColor: '#1e1e1e',
        gridLineWidth: 0,
        labels: {
          textAlign: 'left',
          x: -26,
          format: '{value}',
          style: {
            fontSize: '12px',
            color: '#1e1e1e',
          }
        }
      };

      break;

    case 'xy':

      axeY = [
        { // Primary yAxis
          tickWidth: 1,
          tickColor: '#f7a35c',
          gridLineWidth: 0,
          labels: {
            format: '{value}',
            style: {
              color: '#f7a35c',
            }
          },
          title: {
            text: '',
          },
          opposite: true
        }, { // Secondary yAxis
          tickWidth: 1,
          tickColor: '#169b62',
          gridLineWidth: 0,
          title: {
            text: '',
          },
          labels: {
            format: '{value}',
            style: {
              color: '#169b62'
            }
          },
        }];

      break;

    case 'stacked':

      axeY = {
        visible: false

      };

      break;

    default:
      break;
  }
  return axeY;
}

export function setStatistiquesAxeX(typeGraphique, optionResponsive, categoriesAxeX) {
  let axeX = { };

  switch (typeGraphique) {

    case 'bar':
      axeX = {
        categories: categoriesAxeX,
        title: {
          text: null
        },
        lineWidth: 0,
        gridLineWidth: 0,
        labels: {
          x: -8,
          format: '{value}',
          style: {
            color: '#1e1e1e',
            fontSize: '12px',
          }
        },
      };

      if (optionResponsive === true) {
        axeX.labels.align = 'left';
        axeX.labels.x = 0;
        axeX.labels.style.width = '300px';
      }

      break;

    case 'pie':

      axeX = null;

      break;

    case 'column':

      axeX = {
        categories: categoriesAxeX,
        title: {
          text: null
        },
        gridLineWidth: 0,
        lineWidth: 0,
        labels: {
          y: 34,
          autoRotation: null,
          format: '<b>{value}</b>',
          style: {
            fontSize: '12px',
            color: '#1e1e1e',
          }
        },
      };

      break;

    case 'xy':
      axeX = [{
        categories: categoriesAxeX,
        crosshair: false,
        lineWidth: 0,
        labels: {
          style: {
            color: '#1e1e1e',
            fontSize: '12px'
          }
        }
      }];
      break;

    case 'stacked':

      axeX = {
        offset: 10,
      };

      break;

    default:
      break;
  }

  return axeX;
}

export function setStatistiquesOptionsTrace(typeGraphique, optionResponsive, isReoriente) {
  let optionsTrace = { };

  switch (typeGraphique) {

    case 'bar':

      optionsTrace.bar = {
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#fff',
        pointWidth: 12,
        pointPadding: 25,
        series: {
          states: {
            hover: {
              enabled: false,
            }
          },
        }
      };

      if (optionResponsive === true) {
        optionsTrace.series = {
          pointPlacement: 'between',
          states: {
            hover: {
              enabled: false,
            },
          },
        };
      }

      break;

    case 'pie':

      optionsTrace.pie = {
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            opacity: 1
          }
        },
        events: {
          click: function(e) {
            e.preventDefault();
            return false;
          }
        },
        allowPointSelect: true,
        cursor: 'pointer',
        size: isReoriente && !optionResponsive ? 382 : 162,
        dataLabels: {
          format: '{point.y}%',
          color: '#fff',
          distance: '-40%',
          style: {
            fontSize: '12px',
            textOutline: '0px',
          },
        },
        showInLegend: true,
        borderWidth: 0,
      };

      optionsTrace.series = {
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            opacity: 1
          }
        },
        point: {
          events: {
            legendItemClick: function(e) {
              e.preventDefault();
              return false;
            }
          }
        }
      };

      if (optionResponsive === true) {
        optionsTrace.series = {
          pie: {
            center: [130, 70],
          },
          point: {
            events: {
              legendItemClick: function(e) {
                e.preventDefault();
                return false;
              }
            }
          }
        };
      }

      break;

    case 'column':
      optionsTrace = {
        column: {
          borderWidth: 0,
        },
        series: {
          states: {
            hover: {
              enabled: false,
            },
            inactive: {
              opacity: 1
            }
          },
          pointWidth: 16
        }
      };

      break;

    case 'xy':

      optionsTrace = {
        column: {
          borderWidth: 0,
          states: {
            hover: {
              enabled: false,
            },
            inactive: {
              opacity: 1,
            }
          },
        },
        series: {
          column: {
            states: {
              hover: {
                enabled: false
              }
            }
          },
          states: {
            hover: {
              enabled: false,
            },
            inactive: {
              opacity: 1,
            }
          },
          pointWidth: 16,
          events: {
            legendItemClick: function(e) {
              e.preventDefault();
            }
          }
        }
      };

      break;

    case 'stacked':

      optionsTrace = {
        series: {
          stacking: 'normal',
          states: {
            hover: {
              enabled: false,
            },
            inactive: {
              opacity: 1
            }
          },
          events: {
            legendItemClick: function(e) {
              e.preventDefault();
            }
          }
        },
        bar: {
          pointPadding: 0.2,
          pointWidth: 23,
        }
      };

      break;

    default:
      break;
  }

  return optionsTrace;
}

export function getGraphiqueBar(tabColor, titre, largeur) {
  const barGraphique = {
    graphique: {
      typeGraphique: 'bar',
      largeurGraphique: null,
      hauteurGraphique: largeur >= 768 && largeur <= 1170 ? 930 : 472,
      margeGaucheGraphique: largeur <= 1170 ? 0 : 294,
      margeDroiteGraphique: largeur <= 1170 ? 0 : 55,
      optionResponsive: largeur <= 1170,
      couleursGraphique: tabColor
    },
    titre: {
      optionTitre: titre,
      margeTitre: largeur <= 1170 ? 28 : 38,
      placementTitre: 0
    }
  };

  return barGraphique;
}

export function getGraphiquePie(tabColor, titre, largeur, isReoriente, legend) {
  let pieGraphique = {
    graphique: {
      typeGraphique: 'pie',
      optionResponsive: true,
      couleursGraphique: tabColor,
      optionLegend: legend
    },
    titre: {
      optionTitre: titre,
      margeTitre: 48,
      placementTitre: 0
    }
  };

  if (!isReoriente || largeur < 992) {
    pieGraphique.graphique.largeurGraphique = 300;
    pieGraphique.graphique.hauteurGraphique = 320;
    pieGraphique.graphique.margeGaucheGraphique = 0;
    pieGraphique.graphique.margeDroiteGraphique = 10;
  } else {
    pieGraphique.graphique.hauteurGraphique = 555;
    pieGraphique.graphique.margeGaucheGraphique = -480;
    pieGraphique.graphique.couleursGraphique = tabColor;
    pieGraphique.graphique.optionResponsive = false;
  }

  return pieGraphique;
}

export function getGraphiqueColumn(tabColor, titre) {
  const columnGraphique = {
    graphique: {
      typeGraphique: 'column',
      largeurGraphique: 360,
      hauteurGraphique: 310,
      margeGaucheGraphique: 55,
      margeDroiteGraphique: 55,
      optionResponsive: false,
      couleursGraphique: tabColor
    },
    titre: {
      optionTitre: titre,
      margeTitre: 48,
      placementTitre: 0
    }
  };
  return columnGraphique;
}

export function getGraphiqueEvolution(tabColor, titre, largeur) {
  const graphiqueEvolution = {
    graphique: {
      typeGraphique: 'xy',
      largeurGraphique: largeur <= 1170 ? 300 : 750,
      hauteurGraphique: 310,
      margeGaucheGraphique: 40,
      margeDroiteGraphique: 70,
      optionResponsive: !(largeur >= 768),
      couleursGraphique: tabColor
    },
    titre: {
      optionTitre: titre,
      margeTitre: 48,
    }
  };
  if (largeur >= 768 && largeur <= 1170) {
    graphiqueEvolution.graphique.largeurGraphique = 450;
  } else if (largeur < 768) {
    graphiqueEvolution.graphique.largeurGraphique = 300;
  } else {
    graphiqueEvolution.graphique.largeurGraphique = 750;
  }

  return graphiqueEvolution;
}

export function getGraphiqueStacked(tabColor, titre, largeur) {
  const graphiqueStacked = {
    graphique: {
      typeGraphique: 'stacked',
      largeurGraphique: largeur <= 1170 ? 380 : 600,
      hauteurGraphique: 300,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColor
    },
    titre: {
      optionTitre: titre,
      margeTitre: 34,
    }
  };

  return graphiqueStacked;
}
