// The viewer's own two lists -- Continue watching and the Watch List -- moved
// out of the My Stuff page so the reel can read them too. "Your algorithm" is
// built entirely from what is in here, so there is one source rather than a
// copy that drifts.
//
// continue:true marks a title as part-watched; everything else is saved.
(function (global) {
  const POSTER = p => `https://image.tmdb.org/t/p/w500${p}`;
  const STILL = p => `https://image.tmdb.org/t/p/w780${p}`;
  const localById = Object.fromEntries(
    ((global.FlemishTitles && FlemishTitles.stuff) || []).map(t => [t.id, t]));
  function mixLocal(id, extra){
    return Object.assign({}, localById[id] || {id}, extra);
  }

  const titles = [
    {id:"wed", title:"Wednesday", kind:"Series", length:"8 ep · ~50m", mins:50, provider:"Netflix", logo:"Netflix logo.webp", poster:POSTER("/9PFonBhy4cQy7Jz20NpMygczOkv.jpg"), still:STILL("/sNLP0dLZcVBqYa3MchCXJqgDtFb.jpg"), fallback:POSTER("/9PFonBhy4cQy7Jz20NpMygczOkv.jpg"), tags:["leaving","friday","friends","easy"], progress:.42, continue:true, ep:"S2 E4"},
    mixLocal("tafel", { still:"stills/tafel-gert-card.jpg", fallback:"stills/tafel-gert-card.jpg", continue:true, progress:.74, ep:"Last night" }),
    {id:"thuis", title:"Thuis", kind:"Series", length:"Daily · ~25m", mins:25, provider:"VRT MAX", logo:"vrt-max-logo.png", poster:POSTER("/5tSBe01mPLii0I1NoCGSFJSO97M.jpg"), still:STILL("/39Se1j3FyhhL8kZKAEno5YIss5X.jpg"), fallback:STILL("/39Se1j3FyhhL8kZKAEno5YIss5X.jpg"), tags:["easy","leaving"], progress:.58, continue:true, ep:"Daily"},
    {id:"dune", title:"Dune: Part Two", kind:"Film", length:"2h 46", mins:166, provider:"HBO Max", logo:"hbo-max-new-logo.jpg", poster:POSTER("/y4ml848KTz0zccQxfWlE8CMMC13.jpg"), still:STILL("/eZ239CUp1d6OryZEBPnO2n87gMG.jpg"), fallback:POSTER("/y4ml848KTz0zccQxfWlE8CMMC13.jpg"), tags:["friday","acclaimed","friends"], progress:.18, continue:true, top10:true},
    mixLocal("familie", { still:"stills/familie-card.jpg", fallback:"stills/familie-card.jpg", continue:true, progress:.61, ep:"Daily" }),
    {id:"assisen", title:"Assisen", kind:"Series", length:"S2 · ~45m", mins:45, provider:"VTM GO", logo:"vtm-go-logo.png", poster:POSTER("/1VSSxdlbP5Tqow1eZBVIk6Ngy8E.jpg"), still:STILL("/erZh4tQsSDp83Nr4MP2LhvKAmbF.jpg"), fallback:POSTER("/1VSSxdlbP5Tqow1eZBVIk6Ngy8E.jpg"), tags:["friday","acclaimed"]},
    {id:"under", title:"Undercover", kind:"Series", length:"3 seasons · ~50m", mins:50, provider:"Netflix", logo:"Netflix logo.webp", poster:POSTER("/ziOJNiNUbomrs81behksd0z9Qoz.jpg"), still:STILL("/x2kmiy3RS3hC0SQC0N2sLN3rsdB.jpg"), fallback:POSTER("/ziOJNiNUbomrs81behksd0z9Qoz.jpg"), tags:["friends","easy"], progress:.12, continue:true, ep:"S3 E2"},
    mixLocal("zegeuh", { still:"stills/zegeuh-card.jpg", fallback:"stills/zegeuh-card.jpg", continue:false }),
    {id:"y1985", title:"1985", kind:"Series", length:"8 ep · ~50m", mins:50, provider:"VRT MAX", logo:"vrt-max-logo.png", poster:POSTER("/ma1FtkhQ1mQRbyYUTWY5ngi4Xne.jpg"), still:POSTER("/ma1FtkhQ1mQRbyYUTWY5ngi4Xne.jpg"), fallback:POSTER("/ma1FtkhQ1mQRbyYUTWY5ngi4Xne.jpg"), tags:["acclaimed","friday"]},
    {id:"opp", title:"Oppenheimer", kind:"Film", length:"3h 00", mins:180, provider:"HBO Max", logo:"hbo-max-new-logo.jpg", poster:POSTER("/jtTHxuJhuZpFAnCI4vGjg1LGmpY.jpg"), still:POSTER("/jtTHxuJhuZpFAnCI4vGjg1LGmpY.jpg"), fallback:POSTER("/jtTHxuJhuZpFAnCI4vGjg1LGmpY.jpg"), tags:["acclaimed"], top10:true},
    {id:"verraders", title:"De Verraders", kind:"Series", length:"S3 · ~50m", mins:50, provider:"VTM GO", logo:"vtm-go-logo.png", poster:POSTER("/dB0LuvCwbXQTK2h3R8H8e0pVr2z.jpg"), still:STILL("/niS3AVdPp4pQpL46XxqTn4EG7AL.jpg"), fallback:POSTER("/dB0LuvCwbXQTK2h3R8H8e0pVr2z.jpg"), tags:["friends","friday"]},
    {id:"barb", title:"Barbie", kind:"Film", length:"1h 54", mins:114, provider:"HBO Max", logo:"hbo-max-new-logo.jpg", poster:POSTER("/tnS9DqsJvFjmg4FK4R2LghvOhs5.jpg"), still:POSTER("/tnS9DqsJvFjmg4FK4R2LghvOhs5.jpg"), fallback:POSTER("/tnS9DqsJvFjmg4FK4R2LghvOhs5.jpg"), tags:["friday","friends","easy","acclaimed","short"]},
    mixLocal("jade", { still:"stills/jade-card.jpg", fallback:"stills/jade-card.jpg", continue:false }),
    {id:"chantal", title:"Chantal", kind:"Series", length:"S2 · ~45m", mins:45, provider:"VRT MAX", logo:"vrt-max-logo.png", poster:POSTER("/pmoicISpTRSt4bu03bwEaVazBXS.jpg"), still:POSTER("/pmoicISpTRSt4bu03bwEaVazBXS.jpg"), fallback:POSTER("/pmoicISpTRSt4bu03bwEaVazBXS.jpg"), tags:["easy","friends","friday"]},
    {id:"tlou", title:"The Last of Us", kind:"Series", length:"S2 · ~55m", mins:55, provider:"HBO Max", logo:"hbo-max-new-logo.jpg", poster:POSTER("/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg"), still:STILL("/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg"), fallback:POSTER("/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg"), tags:["friday","acclaimed","leaving"], progress:.67, continue:true, ep:"S2 E3"},
    {id:"schelde", title:"De Slag om de Schelde", kind:"Film", length:"2h 04", mins:124, provider:"Play", logo:"play-logo.png", poster:POSTER("/sCEmbkFF2Ijz35QDMFtBBTcY7Qb.jpg"), still:POSTER("/sCEmbkFF2Ijz35QDMFtBBTcY7Qb.jpg"), fallback:POSTER("/sCEmbkFF2Ijz35QDMFtBBTcY7Qb.jpg"), tags:["friday","acclaimed"]},
    mixLocal("axel", { still:"stills/axel-card.jpg", fallback:"stills/axel-card.jpg", continue:false }),
    {id:"squid", title:"Squid Game", kind:"Series", length:"S2 · ~55m", mins:55, provider:"Netflix", logo:"Netflix logo.webp", poster:POSTER("/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg"), still:STILL("/2meX1nMdScFOoV4370rqHWKmXhY.jpg"), fallback:POSTER("/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg"), tags:["leaving","friends","friday"], progress:.55, continue:true, ep:"S2 E5"},
    {id:"gladijs", title:"Glad IJs", kind:"Series", length:"8 ep · ~50m", mins:50, provider:"VTM GO", logo:"vtm-go-logo.png", poster:POSTER("/5QdsbTX15dxlIsTdwD4xQVVH7W6.jpg"), still:POSTER("/5QdsbTX15dxlIsTdwD4xQVVH7W6.jpg"), fallback:POSTER("/5QdsbTX15dxlIsTdwD4xQVVH7W6.jpg"), tags:["friday","friends"]},
    {id:"bear", title:"The Bear", kind:"Series", length:"S3 · ~30m", mins:30, provider:"Disney+", logo:"disney-plus-logo.png", poster:POSTER("/6FVNnVk0SZFdzb9dkvOr13XyyM4.jpg"), still:STILL("/aZz0AOpYcDyYwfET9k6j3QQXPuS.jpg"), fallback:POSTER("/6FVNnVk0SZFdzb9dkvOr13XyyM4.jpg"), tags:["short","easy","acclaimed","friends"], progress:.31, continue:true, ep:"S3 E4", crop:true},
    {id:"jan", title:"De Bende van Jan de Lichte", kind:"Series", length:"10 ep · ~50m", mins:50, provider:"Play", logo:"play-logo.png", poster:POSTER("/py2KVZZLIa0YDCZNxhy1zdUhPDX.jpg"), still:POSTER("/py2KVZZLIa0YDCZNxhy1zdUhPDX.jpg"), fallback:POSTER("/py2KVZZLIa0YDCZNxhy1zdUhPDX.jpg"), tags:["friday","acclaimed","friends"]},
    mixLocal("agnew", { still:"stills/agnew-card.jpg", fallback:"stills/agnew-card.jpg", continue:false, kind:"Film" }),
    {id:"ferry", title:"Ferry", kind:"Film", length:"1h 46", mins:106, provider:"Netflix", logo:"Netflix logo.webp", poster:POSTER("/w6n1pu9thpCVHILejsuhKf3tNCV.jpg"), still:STILL("/fejok33Ijc6SppiEU1cfwA9Mo2.jpg"), fallback:POSTER("/w6n1pu9thpCVHILejsuhKf3tNCV.jpg"), tags:["short","easy"]},
    {id:"zill", title:"Zillion", kind:"Film", length:"2h 03", mins:123, provider:"Streamz", logo:"streamz-logo.jpg", poster:POSTER("/ns7LIqVWrPbO2FYPQ0ec6mfziSc.jpg"), still:POSTER("/ns7LIqVWrPbO2FYPQ0ec6mfziSc.jpg"), fallback:POSTER("/ns7LIqVWrPbO2FYPQ0ec6mfziSc.jpg"), tags:["easy"]},
    {id:"glad", title:"Gladiator II", kind:"Film", length:"2h 28", mins:148, provider:"Apple TV", logo:"apple tv logo.jpg", poster:POSTER("/gUPnmDkNRSLFynbpNw9VJrYBEgT.jpg"), still:POSTER("/gUPnmDkNRSLFynbpNw9VJrYBEgT.jpg"), fallback:POSTER("/gUPnmDkNRSLFynbpNw9VJrYBEgT.jpg"), tags:["friday"], top10:true}
  ];

  // Genres as TMDB has them for these exact titles, with its split categories
  // folded together ("Sci-Fi & Fantasy" and "Science Fiction" are one thing to a
  // viewer). De Tafel van Gert and Axel are not in TMDB; both are obvious.
  const GENRES = {
    wed: ["Sci-fi", "Mystery", "Comedy"],
    tafel: ["Talk show"],
    thuis: ["Soap"],
    dune: ["Sci-fi", "Adventure"],
    familie: ["Soap"],
    assisen: ["Crime", "Drama"],
    under: ["Crime", "Drama"],
    zegeuh: ["Reality"],
    y1985: ["Drama", "Crime"],
    opp: ["Drama", "History"],
    verraders: ["Reality", "Mystery"],
    barb: ["Comedy", "Adventure", "Fantasy"],
    jade: ["Reality"],
    chantal: ["Crime", "Drama", "Comedy"],
    tlou: ["Drama"],
    schelde: ["War", "History", "Drama"],
    axel: ["Documentary"],
    squid: ["Action", "Mystery", "Drama"],
    gladijs: ["Drama", "Crime"],
    bear: ["Drama", "Comedy"],
    jan: ["Drama", "Action", "Mystery"],
    agnew: ["Comedy"],
    ferry: ["Crime", "Drama", "Action"],
    zill: ["Drama", "Crime", "Thriller"],
    glad: ["Action", "Adventure", "Drama"]
  };
  // original language, and the ones that are drawn from real events
  const DUTCH = ["tafel","thuis","familie","assisen","under","zegeuh","y1985","verraders",
    "jade","chantal","schelde","axel","gladijs","jan","agnew","ferry","zill"];
  const TRUE_STORY = ["opp", "y1985", "schelde", "zill"];

  titles.forEach(t => {
    t.genres = GENRES[t.id] || [];
    t.dutch = DUTCH.includes(t.id);
    t.trueStory = TRUE_STORY.includes(t.id);
  });


  // what the lists actually say about the viewer, counted rather than asserted
  // Facets the viewer would recognise as being about the thing itself -- what
  // it is and where it comes from -- rather than which app it sits behind.
  function profile(){
    const watching = titles.filter(t => t.continue);
    const saved = titles.filter(t => !t.continue);
    const tally = pick => {
      const m = new Map();
      titles.forEach(t => (pick(t) || []).forEach(v => m.set(v, (m.get(v) || 0) + 1)));
      return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    };
    const mins = titles.map(t => t.mins).filter(Boolean);
    const meta = [];
    const n = f => titles.filter(f).length;
    const push = (label, count) => { if (count) meta.push([label, count]); };
    push("Dutch-language", n(t => t.dutch));
    push("True story", n(t => t.trueStory));
    push("Acclaimed", n(t => (t.tags || []).includes("acclaimed")));
    push("Under 30 min", n(t => t.mins && t.mins <= 30));
    push("Over 2 hours", n(t => t.mins && t.mins >= 120));
    meta.sort((a, b) => b[1] - a[1]);
    return {
      titles, watching, saved,
      genres: tally(t => t.genres),
      meta,
      medianMins: mins.length ? mins.slice().sort((a, b) => a - b)[Math.floor(mins.length / 2)] : null
    };
  }

  global.MyLists = { titles, profile, GENRES };
})(window);
