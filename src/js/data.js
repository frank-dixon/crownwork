/**
 * Crownwork — plant modes, cut records, physiology notes, citations.
 * Sources: Cornell Cooperative Extension, UMN Extension, standard pomology.
 */
(function (global) {
  'use strict';

  const CITATIONS = [
    {
      id: 'cornell-apple',
      label: 'Cornell Cooperative Extension — Apple Pruning',
      note: 'Training and pruning principles for bearing apple trees; cut timing and response.',
    },
    {
      id: 'umn-pruning',
      label: 'University of Minnesota Extension — Pruning Trees & Shrubs',
      note: 'General woody-plant pruning physiology, wound response, and timing.',
    },
    {
      id: 'cornell-berries',
      label: 'Cornell Cooperative Extension — Berry Crops',
      note: 'Cane renewal and fruiting wood management for brambles and blueberries.',
    },
    {
      id: 'umn-grape',
      label: 'University of Minnesota Extension — Growing Grapes',
      note: 'Cane and spur pruning systems for cold-climate vines.',
    },
    {
      id: 'pomology',
      label: 'Standard pomology (apical dominance & carbohydrate allocation)',
      note: 'Auxin from apical buds suppresses laterals; pruning redirects carbs to remaining sinks.',
    },
  ];

  function physio(before, after, citeIds) {
    return { before, after, cites: citeIds };
  }

  const MODES = {
    trees: {
      id: 'trees',
      label: 'Trees',
      blurb: 'Central-leader and open-center fruit trees. Start with apple.',
      plants: [
        {
          id: 'apple',
          label: 'Apple',
          species: 'Malus domestica',
          diagram: 'tree',
          lead: true,
          intro:
            'A young central-leader apple with labeled cut points. Select a marker to learn how and why to cut, then switch to Advanced for physiology.',
          cuts: [
            {
              id: 'heading-leader',
              label: 'Heading cut — leader',
              kind: 'heading',
              x: 200,
              y: 48,
              simple: {
                how: 'Shorten the central leader by about one-quarter to one-third of last year’s growth, cutting just above an outward-facing bud.',
                why: 'Heading checks height, thickens the leader, and encourages well-spaced scaffold branches below the cut.',
              },
              advanced: physio(
                'The intact apex produces auxin that reinforces apical dominance and keeps basal buds relatively quiescent. Carbohydrates flow preferentially toward the tip and nearby sinks.',
                'Removing the apex collapses local auxin supply. Lateral buds break; remaining shoots claim more photoassimilate. Cambial activity near the cut rises as the wound compartmentalizes.',
                ['cornell-apple', 'pomology', 'umn-pruning']
              ),
            },
            {
              id: 'thinning-scaffold',
              label: 'Thinning cut — crowded scaffold',
              kind: 'thinning',
              x: 118,
              y: 130,
              simple: {
                how: 'Remove an entire competing scaffold back to the trunk or a strong lateral, leaving a clean collar cut without stubs.',
                why: 'Thinning opens the canopy for light and air, reduces rub and disease pressure, and keeps a few strong, well-angled limbs.',
              },
              advanced: physio(
                'Crowded scaffolds shade inner wood; shaded leaves export less carbohydrate, and fruiting spurs weaken. Pathogen-friendly humidity rises in dense interiors.',
                'A collar-respecting thinning cut removes the competing sink without stimulating a flush of watersprouts the way a blunt heading cut would. Light and assimilation improve on remaining wood.',
                ['cornell-apple', 'umn-pruning']
              ),
            },
            {
              id: 'heading-lateral',
              label: 'Heading cut — lateral',
              kind: 'heading',
              x: 286,
              y: 148,
              simple: {
                how: 'Tip back a vigorous lateral just above an outward bud to shorten and stiffen the branch.',
                why: 'Controlled heading builds sturdy fruiting wood while keeping the branch from racing past the leader.',
              },
              advanced: physio(
                'A long unheaded lateral keeps strong apical pull; lower buds stay suppressed and the limb may become whippy under crop load.',
                'Heading redistributes auxin gradients along the remaining shoot. Several buds behind the cut push; the branch thickens as carbs are spent on wood rather than unchecked tip extension.',
                ['cornell-apple', 'pomology']
              ),
            },
            {
              id: 'renewal-spur',
              label: 'Renewal — aging spur wood',
              kind: 'renewal',
              x: 152,
              y: 210,
              simple: {
                how: 'Cut back a tired, shadowed spur cluster to a younger side shoot or remove the oldest spur unit entirely.',
                why: 'Apple fruit quality declines on old, shaded spurs. Renewal keeps productive 2–4 year wood in the light.',
              },
              advanced: physio(
                'Aging spurs accumulate less starch, set smaller fruit, and shade themselves. Floral initiation suffers under low light.',
                'Removing weak spur wood redirects assimilate to younger fruiting units with higher photosynthetic capacity and better flower-bud differentiation.',
                ['cornell-apple', 'pomology']
              ),
            },
            {
              id: 'sucker',
              label: 'Remove sucker / watersprout',
              kind: 'sucker',
              x: 208,
              y: 268,
              simple: {
                how: 'Cut the upright sucker flush at its origin on the scaffold or rootstock collar—do not leave a stub.',
                why: 'Suckers and watersprouts steal light and vigor, crowd the canopy, and rarely make good fruiting wood.',
              },
              advanced: physio(
                'Severe heading or rootstock vigor often triggers epicormic shoots with high auxin sensitivity and rapid vertical growth, diverting carbs from fruit.',
                'Clean removal eliminates a competing sink. Avoid large heading cuts that recreate the same hormonal imbalance and a new flush of sprouts.',
                ['cornell-apple', 'umn-pruning']
              ),
            },
            {
              id: 'deadwood',
              label: 'Deadwood removal',
              kind: 'deadwood',
              x: 92,
              y: 188,
              simple: {
                how: 'Saw out dead or diseased wood back to healthy tissue or the branch collar, sterilizing tools between suspect cuts.',
                why: 'Deadwood harbors pests and pathogens and blocks light without contributing canopy.',
              },
              advanced: physio(
                'Necrotic wood no longer compartmentalizes actively; pathogens can move through compromised barriers into living tissue.',
                'Cutting to live wood lets the tree seal with callus. Timing in the dormant season limits infection windows for many stone- and pome-fruit cankers.',
                ['umn-pruning', 'cornell-apple']
              ),
            },
            {
              id: 'narrow-crotch',
              label: 'Correct narrow crotch',
              kind: 'structural',
              x: 248,
              y: 112,
              simple: {
                how: 'Remove the weaker of two limbs meeting at a sharp angle, cutting at the collar of the keeper branch.',
                why: 'Included bark and narrow crotches split under crop or ice load. Early correction prevents later breakage.',
              },
              advanced: physio(
                'Bark inclusion weakens the union; mechanical stress concentrates at the crotch rather than distributing through continuous wood grain.',
                'Selecting one well-angled scaffold concentrates radial growth into a sound attachment and reduces failure risk as the tree crops.',
                ['cornell-apple', 'umn-pruning']
              ),
            },
            {
              id: 'crossing',
              label: 'Remove crossing branch',
              kind: 'thinning',
              x: 168,
              y: 168,
              simple: {
                how: 'Take out the less useful of two rubbing or crossing limbs, preferably the one with poorer angle or shade position.',
                why: 'Rub wounds invite disease; crossing limbs waste framework space that should go to open, fruitful wood.',
              },
              advanced: physio(
                'Chronic abrasion damages bark and cambium, creating entry points and localized carbohydrate drain for wound repair.',
                'A clean thinning cut restores spacing so remaining foliage intercepts light efficiently and healing resources go to productive wood.',
                ['umn-pruning', 'cornell-apple']
              ),
            },
          ],
        },
        {
          id: 'pear',
          label: 'Pear',
          species: 'Pyrus communis',
          diagram: 'tree',
          intro:
            'Pear shares apple’s central-leader logic but tends to grow more upright. Cuts emphasize angle and fire-blight vigilance.',
          cuts: [
            {
              id: 'heading-leader',
              label: 'Heading cut — leader',
              kind: 'heading',
              x: 200,
              y: 52,
              simple: {
                how: 'Tip the leader above an outward bud to keep height in check without flattening the tree.',
                why: 'Pears push strongly upright; light heading maintains a manageable leader while inviting scaffolds.',
              },
              advanced: physio(
                'Strong apical dominance keeps pears narrowly upright; basal laterals stay weak without intervention.',
                'Heading plus selective spreading redirects vigor into wider angles and better light penetration.',
                ['cornell-apple', 'pomology']
              ),
            },
            {
              id: 'thinning-upright',
              label: 'Thinning — upright competitor',
              kind: 'thinning',
              x: 230,
              y: 140,
              simple: {
                how: 'Remove a steep upright back to the trunk or a flat lateral.',
                why: 'Uprights shade the center and compete with the leader; flat wood fruits more reliably.',
              },
              advanced: physio(
                'Vertical shoots monopolize auxin-driven vigor and shade fruiting spurs.',
                'Thinning them leaves assimilate for spurs and reduces fire-blight-prone succulent tips.',
                ['umn-pruning', 'cornell-apple']
              ),
            },
            {
              id: 'deadwood',
              label: 'Deadwood / blighted tip',
              kind: 'deadwood',
              x: 110,
              y: 175,
              simple: {
                how: 'Cut blighted or dead tips well into healthy wood; disinfect tools between cuts.',
                why: 'Fire blight moves in succulent tissue—prompt removal limits spread.',
              },
              advanced: physio(
                'Erwinia can travel in xylem of soft growth; stubs leave inoculum in place.',
                'Cutting to healthy wood and avoiding heavy summer heading that forces soft regrowth lowers infection risk.',
                ['umn-pruning']
              ),
            },
            {
              id: 'sucker',
              label: 'Remove watersprout',
              kind: 'sucker',
              x: 200,
              y: 260,
              simple: {
                how: 'Strip upright watersprouts at the origin during dormant season.',
                why: 'They crowd the canopy and rarely set quality fruit.',
              },
              advanced: physio(
                'Epicormic sprouts follow lost apical control or over-pruning.',
                'Removing them restores carb balance toward fruiting wood without recreating a heading flush.',
                ['pomology', 'umn-pruning']
              ),
            },
          ],
        },
      ],
    },
    berries: {
      id: 'berries',
      label: 'Berries',
      blurb: 'Cane and bush fruits—renewal is the main pruning story.',
      plants: [
        {
          id: 'blueberry',
          label: 'Blueberry',
          species: 'Vaccinium corymbosum',
          diagram: 'berry',
          intro:
            'Highbush blueberry is managed by cane renewal: keep a mix of ages and remove the oldest, weakest wood.',
          cuts: [
            {
              id: 'renew-old-cane',
              label: 'Renew old cane',
              kind: 'renewal',
              x: 120,
              y: 220,
              simple: {
                how: 'Cut one or two of the oldest, thickest canes at ground level each dormant season.',
                why: 'Fruit quality and berry size decline on aging canes; renewal keeps productive 2–4 year wood.',
              },
              advanced: physio(
                'Old canes carry more shaded laterals with lower photosynthetic rates and smaller fruit sinks.',
                'Basal removal stimulates new canes from the crown and reallocates carbs to younger fruiting wood.',
                ['cornell-berries', 'umn-pruning']
              ),
            },
            {
              id: 'thin-weak',
              label: 'Thin weak twiggy growth',
              kind: 'thinning',
              x: 260,
              y: 160,
              simple: {
                how: 'Remove spindly, inward, or crossing twigs back to a strong outward shoot.',
                why: 'Opens the bush for spray coverage, light, and larger berries.',
              },
              advanced: physio(
                'Dense twiggy interiors create low-light microclimates that suppress flower-bud set.',
                'Thinning raises light on remaining laterals and concentrates assimilate into fewer, larger fruit.',
                ['cornell-berries']
              ),
            },
            {
              id: 'tip-heading',
              label: 'Light tip heading',
              kind: 'heading',
              x: 200,
              y: 70,
              simple: {
                how: 'Optionally tip overly long whips to encourage branching—avoid heavy heading of mature bushes.',
                why: 'Light tipping can stockier a lanky cane; hard heading reduces next year’s crop.',
              },
              advanced: physio(
                'Flower buds sit on last season’s laterals; severe heading removes crop potential.',
                'Modest tipping redistributes auxin enough to branch without sacrificing most floral nodes.',
                ['cornell-berries', 'pomology']
              ),
            },
            {
              id: 'deadwood',
              label: 'Dead or winter-killed wood',
              kind: 'deadwood',
              x: 90,
              y: 140,
              simple: {
                how: 'Saw out winter-killed or diseased canes to live tissue or the crown.',
                why: 'Dead wood does not fruit and can harbor cane diseases.',
              },
              advanced: physio(
                'Necrotic canes no longer transport or compartmentalize; pathogens persist in dead tissue.',
                'Removal to live wood lets the crown push replacement canes with full vascular capacity.',
                ['umn-pruning', 'cornell-berries']
              ),
            },
          ],
        },
        {
          id: 'raspberry',
          label: 'Raspberry',
          species: 'Rubus idaeus',
          diagram: 'berry',
          intro:
            'Summer-bearing raspberries fruit on second-year canes. Remove spent floricanes after harvest; thin primocanes.',
          cuts: [
            {
              id: 'remove-floricane',
              label: 'Remove spent floricane',
              kind: 'renewal',
              x: 140,
              y: 230,
              simple: {
                how: 'After fruiting, cut brown floricanes at ground level; leave green primocanes.',
                why: 'Floricanes die after crop; removing them frees light and reduces disease carryover.',
              },
              advanced: physio(
                'Spent floricanes are senescing sinks that shade next year’s primocanes.',
                'Ground-level removal redirects resources to primocane thickening and bud development for next season.',
                ['cornell-berries']
              ),
            },
            {
              id: 'thin-primocane',
              label: 'Thin primocanes',
              kind: 'thinning',
              x: 240,
              y: 150,
              simple: {
                how: 'Keep about 4–6 strong primocanes per foot of row; cut extras at the soil line.',
                why: 'Overcrowding shrinks berry size and invites cane disease.',
              },
              advanced: physio(
                'Excess canes compete for light and root-supplied nitrogen and carbs.',
                'Thinning raises per-cane assimilate and improves spray penetration into the canopy.',
                ['cornell-berries', 'umn-pruning']
              ),
            },
            {
              id: 'tip-primocane',
              label: 'Tip tall primocanes',
              kind: 'heading',
              x: 200,
              y: 60,
              simple: {
                how: 'When primocanes exceed the trellis, tip them to encourage lateral fruiting branches.',
                why: 'Tipping builds a productive fruiting framework within reach.',
              },
              advanced: physio(
                'Untipped tips keep apical dominance; few laterals form for next year’s crop.',
                'Heading releases lateral buds that become next season’s fruiting laterals.',
                ['cornell-berries', 'pomology']
              ),
            },
          ],
        },
      ],
    },
    vines: {
      id: 'vines',
      label: 'Vines',
      blurb: 'Grape and similar vines—cane or spur systems on a cordon.',
      plants: [
        {
          id: 'grape',
          label: 'Grape',
          species: 'Vitis spp.',
          diagram: 'vine',
          intro:
            'A cordon-trained grape vine. Balanced pruning leaves enough buds for crop without overcropping the vine.',
          cuts: [
            {
              id: 'cane-select',
              label: 'Select fruiting cane',
              kind: 'renewal',
              x: 280,
              y: 160,
              simple: {
                how: 'Keep a pencil-thick one-year cane with well-spaced buds; tie it along the wire.',
                why: 'Fruit forms on shoots from last year’s cane. Good cane choice sets crop potential.',
              },
              advanced: physio(
                'Bud fertility and cane starch reserves vary with light exposure the prior season.',
                'Selecting well-exposed canes maximizes fruitful shoots and balanced crop load.',
                ['umn-grape', 'pomology']
              ),
            },
            {
              id: 'spur-prune',
              label: 'Spur prune to 2–3 buds',
              kind: 'heading',
              x: 160,
              y: 150,
              simple: {
                how: 'On spur systems, cut each spur back to two or three buds.',
                why: 'Short spurs renew fruiting units close to the cordon and keep the vine compact.',
              },
              advanced: physio(
                'Long unpruned canes overcrop; the vine cannot ripen a heavy crop and store reserves.',
                'Spur heading caps bud number so leaf area can support ripening and return bloom.',
                ['umn-grape', 'cornell-berries']
              ),
            },
            {
              id: 'remove-old-wood',
              label: 'Remove old fruiting wood',
              kind: 'thinning',
              x: 220,
              y: 200,
              simple: {
                how: 'Cut away last year’s fruited canes that you are not retaining as renewals.',
                why: 'Clears the cordon so new canes or spurs have space and light.',
              },
              advanced: physio(
                'Retained old wood shades renewal zones and hosts disease.',
                'Clean removal restores light to the fruiting zone and focuses carbs on retained buds.',
                ['umn-grape']
              ),
            },
            {
              id: 'sucker-trunk',
              label: 'Trunk sucker removal',
              kind: 'sucker',
              x: 200,
              y: 280,
              simple: {
                how: 'Rub or cut suckers from the trunk below the cordon while soft.',
                why: 'Trunk suckers waste vigor and clutter the training system.',
              },
              advanced: physio(
                'Basal suckers are strong sinks competing with the canopy for root-supplied resources.',
                'Early removal preserves assimilate for fruiting wood and keeps the trunk clean for spray and harvest access.',
                ['umn-grape', 'umn-pruning']
              ),
            },
          ],
        },
      ],
    },
    other: {
      id: 'other',
      label: 'Other',
      blurb: 'Figs, currants, and similar woody fruiting plants.',
      plants: [
        {
          id: 'fig',
          label: 'Fig',
          species: 'Ficus carica',
          diagram: 'other',
          intro:
            'Fig pruning balances open structure with protection of fruiting wood. In cold climates, keep a manageable bush form.',
          cuts: [
            {
              id: 'open-center',
              label: 'Open the center',
              kind: 'thinning',
              x: 200,
              y: 140,
              simple: {
                how: 'Remove inward-growing branches to keep a vase-shaped, light-filled bush.',
                why: 'Figs fruit on new growth; light and airflow improve ripening and reduce disease.',
              },
              advanced: physio(
                'Shaded interior shoots produce fewer and poorer-quality syconia.',
                'Thinning raises photosynthetic rates on remaining shoots that will carry the crop.',
                ['umn-pruning', 'pomology']
              ),
            },
            {
              id: 'heading-tall',
              label: 'Head tall shoots',
              kind: 'heading',
              x: 200,
              y: 55,
              simple: {
                how: 'Tip overly tall shoots to keep the bush within reach and encourage branching.',
                why: 'Manageable height makes harvest and winter protection easier.',
              },
              advanced: physio(
                'Unchecked tips keep apical dominance and sparse branching.',
                'Heading releases laterals that expand fruiting surface within a compact canopy.',
                ['pomology']
              ),
            },
            {
              id: 'deadwood',
              label: 'Winter-killed tips',
              kind: 'deadwood',
              x: 100,
              y: 120,
              simple: {
                how: 'After budbreak, cut winter-killed tips back to live green wood.',
                why: 'Figs often die back in cold winters; cleaning dead tips invites strong replacement shoots.',
              },
              advanced: physio(
                'Dead tips block vascular continuity; latent buds below wait for the signal to push.',
                'Cutting to live wood clears the path for vigorous replacement growth that will fruit the same season in many cultivars.',
                ['umn-pruning']
              ),
            },
            {
              id: 'sucker',
              label: 'Remove root suckers',
              kind: 'sucker',
              x: 200,
              y: 290,
              simple: {
                how: 'Dig or cut suckers arising from roots away from the main stool.',
                why: 'Suckers sap vigor from the productive canopy.',
              },
              advanced: physio(
                'Root suckers are autonomous sinks drawing from shared root reserves.',
                'Removing them returns carbohydrate and water flux to the trained canopy.',
                ['umn-pruning', 'pomology']
              ),
            },
          ],
        },
        {
          id: 'currant',
          label: 'Currant',
          species: 'Ribes spp.',
          diagram: 'other',
          intro:
            'Currants fruit best on young wood. Maintain a stool of mixed-age canes much like blueberry renewal.',
          cuts: [
            {
              id: 'renew-cane',
              label: 'Renew oldest canes',
              kind: 'renewal',
              x: 130,
              y: 230,
              simple: {
                how: 'Each year remove two or three of the oldest canes at the base.',
                why: 'Keeps a productive mix of 1-, 2-, and 3-year wood.',
              },
              advanced: physio(
                'Yield and berry size drop on wood older than about three years as shading increases.',
                'Basal renewal stimulates strong replacement canes with high floral potential.',
                ['cornell-berries', 'umn-pruning']
              ),
            },
            {
              id: 'thin-center',
              label: 'Thin the center',
              kind: 'thinning',
              x: 210,
              y: 150,
              simple: {
                how: 'Take out weak or crossing stems from the middle of the stool.',
                why: 'Airflow reduces mildew; light improves fruiting on remaining canes.',
              },
              advanced: physio(
                'Dense stools trap humidity favorable to powdery mildew and reduce light on fruiting laterals.',
                'Thinning improves microclimate and assimilate supply to retained canes.',
                ['cornell-berries']
              ),
            },
            {
              id: 'deadwood',
              label: 'Deadwood cleanup',
              kind: 'deadwood',
              x: 280,
              y: 180,
              simple: {
                how: 'Remove dead or broken canes entirely.',
                why: 'Sanitation first—dead wood is not crop and may harbor pests.',
              },
              advanced: physio(
                'Dead canes are inoculum reservoirs and physical clutter.',
                'Clean cuts to the stool let living canes claim light and root resources.',
                ['umn-pruning']
              ),
            },
          ],
        },
      ],
    },
  };

  const MODE_ORDER = ['trees', 'berries', 'vines', 'other'];

  function getMode(modeId) {
    return MODES[modeId] || MODES.trees;
  }

  function getPlant(modeId, plantId) {
    const mode = getMode(modeId);
    const found = mode.plants.find((p) => p.id === plantId);
    return found || mode.plants[0];
  }

  function defaultPlant() {
    return getPlant('trees', 'apple');
  }

  function citationById(id) {
    return CITATIONS.find((c) => c.id === id);
  }

  function citationsForCut(cut) {
    if (!cut || !cut.advanced || !cut.advanced.cites) return [];
    return cut.advanced.cites.map(citationById).filter(Boolean);
  }

  global.CrownworkData = {
    MODES,
    MODE_ORDER,
    CITATIONS,
    getMode,
    getPlant,
    defaultPlant,
    citationById,
    citationsForCut,
  };
})(typeof window !== 'undefined' ? window : globalThis);
