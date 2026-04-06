import { useState, useEffect } from "react";

/* ============================================================
   FONTS & GLOBAL STYLES
   ============================================================ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Press+Start+2P&family=VT323&family=Inter:wght@300;400;600;700&family=Playfair+Display:ital@1&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }
  body {
    background: #0a0a0a;
    color: #ede8dc;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #4fa86a; border-radius: 3px; }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
  @keyframes ticker {
    0%   { transform: translateX(100vw); }
    100% { transform: translateX(-100%); }
  }
  @keyframes roll  { 0%{left:-130px} 100%{left:105%} }
  @keyframes spin  { to{transform:rotate(360deg)} }
  @keyframes twinkle { 0%,100%{opacity:1} 50%{opacity:.08} }
  @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes flicker {
    0%,100%{opacity:1} 91%{opacity:1} 92%{opacity:.87}
    93%{opacity:1} 97%{opacity:.93} 98%{opacity:1}
  }
`;

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const T = {
  gold:       "#2d6e47",
  goldDim:    "#1a4a2e",
  red:        "#e8372a",
  white:      "#f0ebe0",
  grey1:      "#1a1a1a",
  grey2:      "#222",
  grey3:      "#2e2e2e",
  grey4:      "#b8b0a0",
  grey5:      "#a09890",
  opBlack:    "#080c08",
  opDark:     "#0f1a0f",
  opGreen:    "#33ff57",
  opGreenDim: "#1a8a2e",
  opGreenDk:  "#071a0a",
  opAmber:    "#ffb700",
  opAmberDim: "#a87700",
  opRed:      "#ff3333",
  opTan:      "#d4b896",
};

/* ============================================================
   DATA
   ============================================================ */
const TEAM = [
  { name:"Jonah Traaseth", pos:"Skip",   bio:"The skip. Calls the shots, takes the blame, occasionally makes the shot. Based in Minneapolis. Co-owner of Minneapolis Gymnastics." },
  { name:"Matt Robbins",   pos:"Third",  bio:"Third stone, first opinion. The steady hand behind the skip's questionable decisions." },
  { name:"Zack Thompson",  pos:"Second", bio:"Middle of the order. Does the work nobody talks about. Talks about it anyway." },
  { name:"Eli Traaseth",   pos:"Lead",   bio:"Lead stone. Sets the tone. Family business on and off the ice." },
];

const SPONSORS = [
  { name:"Tater Kegs",           tier:"GOLD — PRESENTING", desc:"The presenting sponsor of The Curling Guys. Bringing the heat (and the kegs) to every end." },
  { name:"Mint Roofing",         tier:"SILVER",            desc:"Top-tier roofing in the Twin Cities. When the roof leaks, you call Mint." },
  { name:"Minneapolis Gymnastics",tier:"SILVER",           desc:"Two locations. Hundreds of athletes. The gym that keeps the skip employed." },
];

const VIDEOS = [
  { title:"Average Joes vs Olympians — Full Match", date:"APR 02, 2026", tag:"EVENT",     desc:"The charity TikTok Live. The Curling Guys vs Team Casper (US Men's Olympic Team). Benefiting Every Meal." },
  { title:"Paul Bunyan Open — Bemidji Bonspiel Recap", date:"MAR 15, 2026", tag:"BONSPIEL", desc:"A full recap of the Paul Bunyan Open cash bonspiel in Bemidji. Rocks were thrown." },
  { title:"How to Read the Ice — Skip's Breakdown", date:"MAR 08, 2026", tag:"EDUCATION", desc:"Jonah breaks down ice reading, weight calls, and why the skip is always right (even when wrong)." },
  { title:"The Curling Guys — Season Intro",          date:"OCT 01, 2025", tag:"BRAND",     desc:"Who we are, why we curl, and what we're building. The origin story." },
];

const OUTPOST_POSTS = [
  {
    id:1, tag:"RULES & FORMAT", featured:true,
    title:"WELCOME TO ROCK LEAGUE. HERE'S WHAT'S DIFFERENT.",
    excerpt:"If you've watched curling before, you know the basics. Sixteen rocks. Two teams. Eight ends. Rock League keeps the rocks and throws out the rest.",
    body:`Rock League didn't have to exist yet. Curling has survived — and thrived — as an amateur sport for generations. The club system works. The Olympics create a spike of interest every four years, then the cameras leave and most fans move on.

That cycle is exactly what this week is trying to break.

THE FORMAT IS UNLIKE ANYTHING YOU'VE SEEN

This isn't just "curling with a league twist." Each match during the round robin features two separate games played simultaneously — a men's fours game and a women's fours game. Both count toward the franchise's overall result.

As an extra incentive, if a franchise sweeps all three games, they earn a bonus half point in the standings. That means every end of every game has implications beyond the scoreboard.

Then Saturday hits and things get really interesting: the format shifts to Mixed Fours, with rosters combining men's and women's players on the same team.

FEWER ENDS — BUT EVERY END COUNTS MORE

Standard elite curling plays 10 ends. Rock League trims that down. Every fours game consists of seven ends. Mixed doubles plays eight.

Why does that matter? Because there's no padding. Every mistake is magnified, and late-game momentum swings hit harder when there are fewer ends to recover in.

THE LAST END HAS A TWIST: "PIN TO WIN"

This is the rule that's going to make you yell at your screen.

During the seventh end in fours play and the eighth end in mixed doubles, any stone covering the pin (the very center of the button) scores two points instead of one.

That means a team down by one going into the final end doesn't just need to score — they need to cover the pin to win outright. Miss it by an inch and the math changes completely.

YOU CAN'T BLANK WHENEVER YOU WANT

In traditional curling, teams will sometimes intentionally score zero in an end — called a "blank" — to retain the hammer (last rock advantage) going into the next end. Rock League limits this. Teams are only allowed one blank per game.

NO EXTRA ENDS — JUST A DRAW TO THE BUTTON

If a game is tied after regulation, there's no extra end. A draw-to-the-button shootout will decide it. One shot. Closest to the center wins.

EVERY POINT IN EVERY END MATTERS FOR THE STANDINGS

There are no concessions, because total points scored serves as a standings tiebreaker. In regular curling, a team down eight with two ends left will often shake hands and head to the bar. Not here. Every rock counts.

HOG LINE CHALLENGES ARE IN PLAY

Each team gets one hog line challenge per game. Use it wisely.

This is curling built for momentum, drama, and fans who've never watched before. Welcome to Rock League.`,
    date:"APR 04, 2026", author:"THE CURLING GUYS", readTime:"6 MIN READ",
  },
  {
    id:2, tag:"ROSTER BREAKDOWN", featured:false,
    title:"MEET YOUR TEAM: THE FRONTIER CURLING CLUB ROSTER",
    excerpt:"Frontier is the only American franchise in Rock League. Here's who's wearing the colors in Toronto.",
    body:`Frontier is the only American franchise in Rock League. That alone should be enough to get behind them. But the roster makes it easy.

KOREY DROPKIN — CAPTAIN

Duluth, MN. Two months ago he was playing for curling gold for the first time in US history at the Milano-Cortina Olympics. He and Cory Thiesse won silver in mixed doubles — the best result in US curling history at a non-Shuster Olympics.

He plays to the crowd at every break — dancing, pointing to his teammates after great throws, genuinely performing. He's exactly the kind of captain a new league needs.

JOHN SHUSTER

Superior, WI. 2018 Olympic gold medalist. If you watched the 2018 Olympics, you know the name. The comeback. The miracle on ice. The jump. He's still throwing rocks at an elite level and brings credibility that's hard to overstate.

THE IMPORT WEAPONS

Grant Hardie, from Glasgow, Scotland — a multiple Grand Slam champion who brings elite international experience to the men's side.

On the women's side, Stefania Constantini leads the group — an Italian Olympic champion who competed at Beijing 2022 and brings international firepower to a roster that needed it.

Cory Thiesse from Duluth rounds out the women's roster — Dropkin's Olympic silver medal partner, and one of the most technically precise mixed doubles players in the game.

THE GM: CHRIS PLYS

Chris Plys served as third on John Shuster's gold-medal Olympic rink. He's the chess player behind the roster decisions, and he's built something worth watching.

The bottom line: Frontier is deep, diverse, and built around a captain who was standing on an Olympic podium eight weeks ago. This is the team to root for.`,
    date:"APR 03, 2026", author:"THE CURLING GUYS", readTime:"5 MIN READ",
  },
  {
    id:3, tag:"MATCHUP PREVIEW", featured:false,
    title:"SIX TEAMS. ONE WEEK. HERE'S WHO FRONTIER HAS TO BEAT.",
    excerpt:"The round robin is five days. Every franchise plays every other franchise once. No easy games.",
    body:`The round robin is five days. Every franchise plays every other franchise once. No margin for error.

MAPLE UNITED — Captain: Rachel Homan

Threat Level: HIGH

Maple United is captained by Rachel Homan, one of the most accomplished skips in Canadian women's curling history. Multiple world championships. Olympic experience. She does not miss big shots.

SHIELD CURLING CLUB — Captain: Brad Jacobs

Threat Level: VERY HIGH

Shield Curling Club is captained by Brad Jacobs, who just won men's gold at the Milano-Cortina Olympics. He's coming in as the reigning Olympic champion with a full squad built around that momentum.

ALPINE CURLING CLUB — Captain: Alina Pätz

Threat Level: HIGH

Alpine is captained by Swiss Olympic champion Alina Pätz. The men's roster includes Oskar Eriksson, a Swede with multiple world championship medals. This is a deep, technically excellent squad.

NORTHERN UNITED — Captain: Bruce Mouat

Threat Level: HIGH

Northern United is captained by Scotland's Bruce Mouat, the reigning World Men's Champion. He has been the best skip in the world for stretches of the last three years. This matchup will define Frontier's week.

TYPHOON CURLING CLUB — Captain: Chinami Yoshida

Threat Level: Don't sleep on them

Typhoon is captained by Japan's Chinami Yoshida. The men's side features Niklas Edin — the most decorated curler in history. Do not sleep on this team.

Five opponents. All of them dangerous. That's what makes this week worth watching.`,
    date:"APR 03, 2026", author:"MATT ROBBINS", readTime:"5 MIN READ",
  },
  {
    id:4, tag:"BIG PICTURE", featured:false,
    title:"WHY THIS WEEK MATTERS MORE THAN JUST A TROPHY",
    excerpt:"Rock League didn't have to exist yet. But for curlers who've been grinding without a pro league, this week is the beginning of something real.",
    body:`Let's be honest about something.

Rock League didn't have to exist yet. Curling has survived — and thrived — as an amateur sport for generations. The club system works. The Olympics create a spike every four years. Most fans move on.

That cycle is exactly what this week is trying to break.

THE BET BEING MADE

Rock League was launched by The Curling Group in the spring of 2025, bringing together six mixed-gender franchises for a debut week of professional competition in Toronto.

The prize purse for the Toronto debut week is $250,000. That's real money for curlers who, up until now, have largely funded their competitive careers out of pocket.

Korey Dropkin works as a realtor in Wisconsin. Cory Thiesse is a technician at a mercury lab. These are world-class athletes with day jobs. Rock League is trying to change that equation.

WHAT SUCCESS ACTUALLY LOOKS LIKE

This week of Rock League action is being billed as a preview season — the true vision will play out over multiple seasons, in multiple cities, with growing broadcast reach.

CBC Sports will bring more than 40 hours of live streaming coverage to fans across Canada for this debut week. FLO Live carries it for US audiences.

WHY FRONTIER SPECIFICALLY

The US has never had a professional curling team to root for. Not a real one, with a name and a jersey and a captain who just stood on an Olympic podium.

For those of us in the Upper Midwest, where curling clubs like Frogtown are full of people who actually know what a hammer is, Frontier is ours.

The Outpost exists because Frontier deserves fans who show up.

Let's go get a championship.`,
    date:"APR 02, 2026", author:"THE CURLING GUYS", readTime:"5 MIN READ",
  },
];

/* ============================================================
   SHARED NAV
   ============================================================ */
function SiteNav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label:"HOME",     pg:"home" },
    { label:"THE GUYS", pg:"team" },
    { label:"OUTPOST",  pg:"outpost" },
    { label:"SPONSORS", pg:"sponsors" },
    { label:"MERCH",    pg:"merch" },
    { label:"VIDEOS",   pg:"videos" },
    { label:"CONTACT",  pg:"contact" },
  ];
  function go(pg) { setPage(pg); setOpen(false); }
  return (
    <>
      <style>{`
        .tcg-nav-links { display:flex; gap:0; flex:1; justify-content:center; }
        .tcg-nav-cta   { display:block; }
        .tcg-hamburger { display:none !important; }
        @media(max-width:720px){
          .tcg-nav-links { display:none !important; }
          .tcg-nav-cta   { display:none !important; }
          .tcg-hamburger { display:flex !important; }
        }
      `}</style>
      <nav style={{
        position:"sticky", top:0, zIndex:500,
        background:"rgba(10,10,10,.97)", borderBottom:"2px solid "+T.grey3,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 20px", height:64, gap:12,
        backdropFilter:"blur(12px)",
      }}>
        <button onClick={()=>go("home")} style={{background:"none",border:"none",cursor:"pointer",flexShrink:0}}>
          <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:T.gold,letterSpacing:3}}>
            THE CURLING GUYS
          </span>
        </button>
        <div className="tcg-nav-links">
          {links.map(({label,pg}) => (
            <button key={pg} onClick={()=>go(pg)} style={{
              background:"none", border:"none", cursor:"pointer",
              fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:10,
              letterSpacing:1.2, whiteSpace:"nowrap",
              color: page===pg ? T.gold : T.grey5,
              padding:"8px 9px",
              borderBottom: page===pg ? "2px solid "+T.gold : "2px solid transparent",
              transition:"color .2s",
            }}>{label}</button>
          ))}
        </div>
        <a href="https://www.tiktok.com/@the.curling.guys" target="_blank" rel="noreferrer"
          className="tcg-nav-cta"
          style={{
            background:T.gold, color:"#000", fontFamily:"'Inter',sans-serif",
            fontWeight:700, fontSize:10, letterSpacing:2, padding:"8px 14px",
            textDecoration:"none", flexShrink:0,
          }}>FOLLOW US</a>
        <button className="tcg-hamburger" onClick={()=>setOpen(o=>!o)}
          style={{
            background:"none", border:"none", cursor:"pointer",
            flexDirection:"column", gap:5, padding:"8px 4px", flexShrink:0,
          }}>
          <span style={{display:"block",width:24,height:2,background:open?T.gold:T.grey5,transition:"background .2s"}}/>
          <span style={{display:"block",width:24,height:2,background:open?T.gold:T.grey5,transition:"background .2s"}}/>
          <span style={{display:"block",width:24,height:2,background:open?T.gold:T.grey5,transition:"background .2s"}}/>
        </button>
      </nav>
      {open && (
        <div style={{
          position:"fixed", top:64, left:0, right:0, bottom:0, zIndex:498,
          background:"rgba(10,10,10,.98)", backdropFilter:"blur(12px)",
          display:"flex", flexDirection:"column", overflowY:"auto",
        }}>
          {links.map(({label,pg}) => (
            <button key={pg} onClick={()=>go(pg)} style={{
              background: page===pg ? T.grey2 : "none",
              border:"none", borderBottom:"1px solid "+T.grey3,
              cursor:"pointer", textAlign:"left",
              fontFamily:"'Bebas Neue',sans-serif", fontSize:28,
              letterSpacing:3, color: page===pg ? T.gold : T.grey5,
              padding:"22px 28px",
              display:"flex", alignItems:"center", justifyContent:"space-between",
            }}>
              <span>{label}</span>
              <span style={{fontSize:14,color:T.gold,opacity:page===pg?1:0}}>●</span>
            </button>
          ))}
          <a href="https://www.tiktok.com/@the.curling.guys" target="_blank" rel="noreferrer"
            style={{
              background:T.gold, color:"#000",
              fontFamily:"'Bebas Neue',sans-serif", fontSize:22,
              letterSpacing:3, padding:"22px 28px",
              textDecoration:"none", textAlign:"center",
              display:"block", marginTop:"auto",
            }}>
            FOLLOW US ON TIKTOK →
          </a>
        </div>
      )}
    </>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */
function HomePage({ setPage, openArticle }) {
  return (
    <div>
      {/* HERO */}
      <div style={{
        minHeight:"92vh", position:"relative",
        background:"linear-gradient(160deg, #0a0a0a 0%, #111 40%, #0f1505 100%)",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        overflow:"hidden", padding:"60px 24px",
      }}>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(232,200,74,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(232,200,74,.03) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}}/>
        <h1 style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:"clamp(64px,10vw,140px)",
          letterSpacing:6, lineHeight:.95,
          textAlign:"center", color:T.white,
          animation:"fadeUp .7s ease both", animationDelay:".2s",
        }}>
          THE<br/>
          <span style={{
            background:`linear-gradient(135deg, ${T.gold} 0%, #fff 50%, ${T.gold} 100%)`,
            backgroundSize:"200% auto",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            animation:"shimmer 3s linear infinite",
          }}>CURLING</span><br/>GUYS
        </h1>
        <p style={{
          fontFamily:"'Inter',sans-serif", fontWeight:300, fontSize:18,
          color:T.grey5, marginTop:28, maxWidth:540, textAlign:"center", lineHeight:1.7,
          animation:"fadeUp .8s ease both", animationDelay:".35s",
        }}>
          Competitive curling. Real content. Based in Minneapolis.<br/>
          The Curling Guys compete at Frogtown Curling Club and cover the sport they love.
        </p>
        <div style={{display:"flex",gap:16,marginTop:40,flexWrap:"wrap",justifyContent:"center",animation:"fadeUp .9s ease both",animationDelay:".5s"}}>
          <button onClick={()=>setPage("outpost")} style={{
            background:T.gold, color:"#000",
            fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:13, letterSpacing:2,
            padding:"16px 36px", border:"none", cursor:"pointer",
          }}>READ THE OUTPOST</button>
          <button onClick={()=>setPage("team")} style={{
            background:"transparent", color:T.white,
            fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:13, letterSpacing:2,
            padding:"16px 36px", border:`2px solid ${T.grey3}`, cursor:"pointer",
          }}>MEET THE TEAM</button>
        </div>
        <div style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",color:T.grey5,fontSize:20,animation:"pulse 2s ease infinite"}}>↓</div>
      </div>

      {/* TICKER */}
      <div style={{background:T.gold,overflow:"hidden",padding:"10px 0",whiteSpace:"nowrap"}}>
        <span style={{display:"inline-block",animation:"ticker 28s linear infinite",fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"#000"}}>
          {["THE CURLING GUYS — FROGTOWN CURLING CLUB","ROCK LEAGUE TORONTO APR 6-12","AVERAGE JOES VS OLYMPIANS — CHARITY EVENT","PAUL BUNYAN OPEN — BEMIDJI BONSPIEL","FRONTIER CURLING CLUB — THE ONLY US FRANCHISE","$250,000 PRIZE PURSE"].map((t,i) => (
            <span key={i}>{t}<span style={{margin:"0 32px",opacity:.4}}>|</span></span>
          ))}
        </span>
      </div>

      {/* FEATURE GRID */}
      <div style={{maxWidth:1160,margin:"0 auto",padding:"80px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:2}}>
          {[
            {label:"THE OUTPOST", title:"Frontier Curling Club Coverage", desc:"The Curling Guys cover Rock League's only American franchise. Dispatches, roster breakdowns, matchup previews.", pg:"outpost"},
            {label:"THE TEAM",   title:"The Curling Guys",                desc:"Meet the skip, third, second, and lead. Four guys from Minneapolis throwing rocks at Frogtown.",              pg:"team"},
            {label:"VIDEO",      title:"Content & Media",                 desc:"TikTok. YouTube. Long-form. Short-form. The charity live event. It's all here.",                               pg:"videos"},
            {label:"SPONSORS",   title:"Partners & Sponsors",             desc:"Tater Kegs, Mint Roofing, Minneapolis Gymnastics. The brands that believe in what we're building.",            pg:"sponsors"},
          ].map((c,i) => (
            <button key={i} onClick={()=>setPage(c.pg)} style={{
              background:T.grey1, border:"none", cursor:"pointer", padding:"48px 36px",
              textAlign:"left", transition:"background .2s",
            }}
            onMouseEnter={e=>e.currentTarget.style.background=T.grey2}
            onMouseLeave={e=>e.currentTarget.style.background=T.grey1}
            >
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:4,color:T.gold,marginBottom:12}}>{c.label}</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:2,color:T.white,marginBottom:12}}>{c.title}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:T.grey5,lineHeight:1.6}}>{c.desc}</div>
              <div style={{marginTop:24,fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:700,letterSpacing:2,color:T.gold}}>EXPLORE →</div>
            </button>
          ))}
        </div>
      </div>

      {/* LATEST FROM OUTPOST */}
      <div style={{background:T.grey1,padding:"80px 24px"}}>
        <div style={{maxWidth:1160,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40,flexWrap:"wrap",gap:16}}>
            <div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:5,color:T.gold,marginBottom:8}}>LATEST</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:48,letterSpacing:3,color:T.white}}>FROM THE OUTPOST</div>
            </div>
            <button onClick={()=>setPage("outpost")} style={{background:"none",border:`2px solid ${T.grey3}`,color:T.grey5,fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:11,letterSpacing:2,padding:"10px 20px",cursor:"pointer"}}>
              VIEW ALL DISPATCHES →
            </button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:2}}>
            {OUTPOST_POSTS.slice(0,3).map(p => (
              <button key={p.id} onClick={()=>openArticle(p)} style={{
                background:T.grey2, border:"none", cursor:"pointer", padding:"32px 28px",
                textAlign:"left", transition:"background .2s",
              }}
              onMouseEnter={e=>e.currentTarget.style.background=T.grey3}
              onMouseLeave={e=>e.currentTarget.style.background=T.grey2}
              >
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:10,letterSpacing:4,color:T.gold,marginBottom:10}}>{p.tag}</div>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:16,fontWeight:700,color:T.white,marginBottom:10,lineHeight:1.4}}>{p.title}</div>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:T.grey5,lineHeight:1.6,marginBottom:16}}>{p.excerpt}</div>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:T.grey4}}>{p.date}</div>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,letterSpacing:2,color:T.gold,marginTop:16}}>READ →</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TEAM PAGE
   ============================================================ */
function TeamPage() {
  return (
    <div style={{maxWidth:1160,margin:"0 auto",padding:"80px 24px"}}>
      <div style={{marginBottom:64}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:5,color:T.gold,marginBottom:12}}>FROGTOWN CURLING CLUB</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(48px,7vw,96px)",letterSpacing:4,color:T.white,marginBottom:20}}>TEAM TRAASETH</h1>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:18,color:T.grey5,maxWidth:600,lineHeight:1.7}}>
          Competitive curlers based in Minneapolis, MN. We throw rocks at Frogtown Curling Club in St. Paul and document the whole thing.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:2,marginBottom:64}}>
        {TEAM.map((m,i) => (
          <div key={i} style={{background:T.grey1,padding:"48px 32px"}}>
            <div style={{
              width:80, height:80, borderRadius:"50%",
              background:`linear-gradient(135deg, ${T.gold}, ${T.goldDim})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:"#000",
              marginBottom:24,
            }}>{m.name.charAt(0)}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:2,color:T.white,marginBottom:6}}>{m.name}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:4,color:T.gold,marginBottom:16}}>{m.pos}</div>
            <div style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:T.grey5,lineHeight:1.6}}>{m.bio}</div>
          </div>
        ))}
      </div>
      <div style={{background:T.grey1,padding:"48px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,flexWrap:"wrap"}}>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:5,color:T.gold,marginBottom:8}}>HOME ICE</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,letterSpacing:2,color:T.white,marginBottom:16}}>FROGTOWN CURLING CLUB</div>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:T.grey5,lineHeight:1.7}}>
            Based in St. Paul, Minnesota. One of the Twin Cities' best curling clubs and home ice for Team Traaseth.
          </div>
        </div>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:5,color:T.gold,marginBottom:8}}>THE BRAND</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,letterSpacing:2,color:T.white,marginBottom:16}}>THE CURLING GUYS</div>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:T.grey5,lineHeight:1.7}}>
            A media brand built by curlers, for curling fans. TikTok content, long-form coverage, merchandise, and now The Outpost.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SPONSORS PAGE
   ============================================================ */
function SponsorsPage() {
  return (
    <div style={{maxWidth:1160,margin:"0 auto",padding:"80px 24px"}}>
      <div style={{marginBottom:64}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:5,color:T.gold,marginBottom:12}}>PARTNERS</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(48px,7vw,96px)",letterSpacing:4,color:T.white,marginBottom:20}}>SPONSORS</h1>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:18,color:T.grey5,maxWidth:560,lineHeight:1.7}}>
          The brands that believe in what we're building. Interested in partnering? Let's talk.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:2,marginBottom:64}}>
        {SPONSORS.map((s,i) => (
          <div key={i} style={{background:T.grey1,padding:"48px 36px",borderTop:`4px solid ${T.gold}`}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:10,letterSpacing:4,color:T.gold,marginBottom:12}}>{s.tier}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,letterSpacing:2,color:T.white,marginBottom:16}}>{s.name}</div>
            <div style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:T.grey5,lineHeight:1.6}}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div style={{background:T.grey1,padding:"48px"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:5,color:T.gold,marginBottom:32}}>SPONSORSHIP TIERS</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:2,marginBottom:32}}>
          {[
            {tier:"GOLD",      price:"$2,500+", perks:"Logo on all content, jersey placement, social features, presenting sponsor designation."},
            {tier:"SILVER",    price:"$1,000+", perks:"Logo on select content, social features, sponsor deck listing."},
            {tier:"BRONZE",    price:"$500+",   perks:"Social shoutout, sponsor deck listing, community recognition."},
            {tier:"COMMUNITY", price:"$250+",   perks:"Support local curling. Website listing and community recognition."},
          ].map((t,i) => (
            <div key={i} style={{background:T.grey2,padding:"28px 22px"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:3,color:T.gold,marginBottom:8}}>{t.tier}</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:2,color:T.white,marginBottom:12}}>{t.price}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:T.grey5,lineHeight:1.6}}>{t.perks}</div>
            </div>
          ))}
        </div>
        <div style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:T.grey5}}>
          Contact us: <span style={{color:T.gold}}>sponsors@thecurlingguys.com</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MERCH PAGE
   ============================================================ */
function MerchPage() {
  return (
    <div style={{maxWidth:1160,margin:"0 auto",padding:"80px 24px"}}>
      <div style={{marginBottom:64}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:5,color:T.gold,marginBottom:12}}>STORE</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(48px,7vw,96px)",letterSpacing:4,color:T.white,marginBottom:20}}>MERCH</h1>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:18,color:T.grey5,maxWidth:560,lineHeight:1.7}}>
          Represent the guys. Available on Bonfire. Ships anywhere.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:2,marginBottom:48}}>
        {[
          {name:"GOOD CURLING HAT",           desc:"Richardson R-Active rope hat. 85% cotton. The intentional look.",                             price:"$32", tag:"BESTSELLER"},
          {name:"TCG LOGO TEE",               desc:"Classic The Curling Guys logo tee. Unisex. Available in multiple colors.",                    price:"$28", tag:null},
          {name:"DESCENDANTS OF GRACE JERSEY",desc:"Dark green HTV design. The bonspiel team jersey. Limited run.",                              price:"$45", tag:"LIMITED"},
          {name:"OUTPOST PATCH CAP",          desc:"Oregon Trail pixel aesthetic meets curling media. The Outpost in hat form.",                  price:"$34", tag:"NEW"},
        ].map((m,i) => (
          <div key={i} style={{background:T.grey1,padding:"0 0 28px 0"}}>
            <div style={{
              height:200,
              background:`linear-gradient(135deg, ${T.grey2} 0%, ${T.grey3} 100%)`,
              display:"flex", alignItems:"center", justifyContent:"center",
              position:"relative", marginBottom:20,
            }}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:48,letterSpacing:4,color:T.grey3}}>TCG</div>
              {m.tag && <div style={{position:"absolute",top:12,right:12,background:m.tag==="BESTSELLER"?T.gold:m.tag==="LIMITED"?T.red:"#444",color:m.tag==="BESTSELLER"?"#000":"#fff",fontFamily:"'Bebas Neue',sans-serif",fontSize:10,letterSpacing:2,padding:"4px 8px"}}>{m.tag}</div>}
            </div>
            <div style={{padding:"0 20px"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:2,color:T.white,marginBottom:8}}>{m.name}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:T.grey5,lineHeight:1.6,marginBottom:16}}>{m.desc}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:T.gold}}>{m.price}</div>
                <a href="https://www.bonfire.com" target="_blank" rel="noreferrer" style={{background:T.gold,color:"#000",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:11,letterSpacing:1.5,padding:"8px 16px",textDecoration:"none"}}>BUY</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:T.grey1,padding:"40px",textAlign:"center"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,letterSpacing:3,color:T.white,marginBottom:12}}>SHOP THE FULL STORE</div>
        <div style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:T.grey5,marginBottom:24}}>All merch available on Bonfire. New drops throughout the season.</div>
        <a href="https://www.bonfire.com" target="_blank" rel="noreferrer" style={{display:"inline-block",background:T.gold,color:"#000",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:13,letterSpacing:2,padding:"14px 32px",textDecoration:"none"}}>VISIT BONFIRE STORE →</a>
      </div>
    </div>
  );
}

/* ============================================================
   VIDEOS PAGE
   ============================================================ */
function VideosPage() {
  return (
    <div style={{maxWidth:1160,margin:"0 auto",padding:"80px 24px"}}>
      <div style={{marginBottom:64}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:5,color:T.gold,marginBottom:12}}>MEDIA</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(48px,7vw,96px)",letterSpacing:4,color:T.white,marginBottom:20}}>VIDEOS</h1>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:18,color:T.grey5,maxWidth:560,lineHeight:1.7}}>
          From TikTok Lives to long-form bonspiel recaps. This is the content archive.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:2,marginBottom:48}}>
        {VIDEOS.map((v,i) => (
          <div key={i} style={{background:T.grey1}}>
            <div style={{
              height:180,
              background:`linear-gradient(135deg,#0a0a0a,${T.grey3})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              borderBottom:`2px solid ${T.grey3}`, position:"relative",
            }}>
              <div style={{width:52,height:52,background:"rgba(45,110,71,.15)",border:`2px solid ${T.gold}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.gold,fontSize:22}}>▶</div>
              <div style={{position:"absolute",top:12,left:12,background:T.grey3,color:T.gold,fontFamily:"'Bebas Neue',sans-serif",fontSize:10,letterSpacing:2,padding:"4px 8px"}}>{v.tag}</div>
            </div>
            <div style={{padding:"24px 22px"}}>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:15,fontWeight:700,color:T.white,marginBottom:8,lineHeight:1.4}}>{v.title}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:T.grey5,lineHeight:1.6,marginBottom:12}}>{v.desc}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:T.grey4}}>{v.date}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:T.gold,padding:"48px",textAlign:"center"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:5,color:"rgba(0,0,0,.6)",marginBottom:8}}>FOLLOW ALONG</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:48,letterSpacing:3,color:"#000",marginBottom:12}}>@THE.CURLING.GUYS</div>
        <div style={{fontFamily:"'Inter',sans-serif",fontSize:15,color:"rgba(0,0,0,.7)",marginBottom:24}}>New content every week. TikTok, YouTube, and beyond.</div>
        <a href="https://www.tiktok.com/@the.curling.guys" target="_blank" rel="noreferrer" style={{display:"inline-block",background:"#000",color:T.gold,fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:13,letterSpacing:2,padding:"14px 32px",textDecoration:"none"}}>FOLLOW ON TIKTOK →</a>
      </div>
    </div>
  );
}

/* ============================================================
   CONTACT PAGE
   ============================================================ */
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({name:"",email:"",subject:"",msg:""});
  return (
    <div style={{maxWidth:800,margin:"0 auto",padding:"80px 24px"}}>
      <div style={{marginBottom:56}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:5,color:T.gold,marginBottom:12}}>GET IN TOUCH</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(48px,7vw,96px)",letterSpacing:4,color:T.white}}>CONTACT</h1>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,marginBottom:56,flexWrap:"wrap"}}>
        {[
          {label:"SPONSORSHIPS", val:"sponsors@thecurlingguys.com"},
          {label:"TIKTOK",       val:"@the.curling.guys"},
          {label:"GENERAL",      val:"hello@thecurlingguys.com"},
          {label:"HOME ICE",     val:"Frogtown Curling Club, St. Paul MN"},
        ].map((c,i) => (
          <div key={i}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:10,letterSpacing:4,color:T.gold,marginBottom:6}}>{c.label}</div>
            <div style={{fontFamily:"'Inter',sans-serif",fontSize:16,color:T.white}}>{c.val}</div>
          </div>
        ))}
      </div>
      {!sent ? (
        <div style={{background:T.grey1,padding:"40px"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:3,color:T.white,marginBottom:24}}>SEND A MESSAGE</div>
          {[
            {label:"NAME",    key:"name",    ph:"Your name"},
            {label:"EMAIL",   key:"email",   ph:"your@email.com"},
            {label:"SUBJECT", key:"subject", ph:"Sponsorship / Media / General"},
          ].map(f => (
            <div key={f.key} style={{marginBottom:16}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:10,letterSpacing:3,color:T.grey5,marginBottom:6}}>{f.label}</div>
              <input value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.ph} style={{width:"100%",background:"#111",border:`1px solid ${T.grey3}`,color:T.white,padding:"12px 14px",fontFamily:"'Inter',sans-serif",fontSize:14,outline:"none"}}/>
            </div>
          ))}
          <div style={{marginBottom:24}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:10,letterSpacing:3,color:T.grey5,marginBottom:6}}>MESSAGE</div>
            <textarea value={form.msg} onChange={e=>setForm(p=>({...p,msg:e.target.value}))} placeholder="What's on your mind..." rows={5} style={{width:"100%",background:"#111",border:`1px solid ${T.grey3}`,color:T.white,padding:"12px 14px",fontFamily:"'Inter',sans-serif",fontSize:14,outline:"none",resize:"vertical"}}/>
          </div>
          <button onClick={()=>setSent(true)} style={{background:T.gold,color:"#000",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:13,letterSpacing:2,padding:"14px 32px",border:"none",cursor:"pointer"}}>
            SEND MESSAGE →
          </button>
        </div>
      ) : (
        <div style={{background:T.grey1,padding:"48px",textAlign:"center"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:40,letterSpacing:3,color:T.gold,marginBottom:12}}>MESSAGE SENT.</div>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:16,color:T.grey5}}>We'll be in touch. Good curling.</div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   OUTPOST — Oregon Trail pixel shell CSS
   ============================================================ */
const OP_CSS = `
  .op-root { background:#080c08; color:#33ff57; font-family:'VT323',monospace; font-size:20px; min-height:100vh; position:relative; }
  .op-root::after { content:''; position:fixed; inset:0; background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.08) 2px,rgba(0,0,0,.08) 4px); pointer-events:none; z-index:9999; }
  .op-root::before { content:''; position:fixed; inset:0; background:radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,.6) 100%); pointer-events:none; z-index:9998; }
  .trail-scene { width:100%; height:170px; background:#050d14; position:relative; overflow:hidden; flex-shrink:0; }
  .ts-sky  { position:absolute; inset:0; background:linear-gradient(to bottom,#02060f 0%,#050d14 60%,#071a0a 100%); }
  .ts-star { position:absolute; background:#fff; animation:twinkle var(--dur,2s) var(--d,0s) ease-in-out infinite; border-radius:50%; }
  .ts-moon { position:absolute; top:12px; right:80px; width:24px; height:24px; background:#d4c870; border-radius:50%; box-shadow:0 0 12px rgba(212,200,112,.4); }
  .ts-mtn-wrap { position:absolute; bottom:42%; left:0; right:0; display:flex; align-items:flex-end; }
  .ts-mtn  { width:0; border-style:solid; border-color:transparent; flex-shrink:0; }
  .ts-ground { position:absolute; bottom:0; left:0; right:0; height:42%; background:#0d1f08; border-top:2px solid #1a3a0a; }
  .ts-trail  { position:absolute; top:0; left:0; right:0; height:14px; background:#2a1800; }
  .ts-trail::after { content:''; position:absolute; top:5px; left:0; right:0; height:4px; background:repeating-linear-gradient(90deg,#3d2500 0,#3d2500 20px,#2a1800 20px,#2a1800 40px); }
  .ts-tree { position:absolute; bottom:42%; margin-bottom:-12px; display:flex; flex-direction:column; align-items:center; }
  .ts-trunk { background:#3d2010; }
  .ts-top   { border-style:solid; border-color:transparent; margin-bottom:-3px; }
  .ts-wagon { position:absolute; bottom:42%; margin-bottom:-12px; width:130px; height:56px; animation:roll 18s linear infinite; }
  .ts-wbody { position:absolute; bottom:10px; left:4px; width:58px; height:22px; background:#8B4513; border:2px solid #5D2E0C; }
  .ts-wcover{ position:absolute; bottom:29px; left:8px; width:44px; height:18px; background:#e8dcc8; border:2px solid #c8b898; border-radius:50% 50% 0 0 / 100% 100% 0 0; }
  .ts-wheel { position:absolute; bottom:2px; width:14px; height:14px; border:3px solid #4a2008; border-radius:50%; background:#2a1000; animation:spin 0.6s linear infinite; }
  .ts-wheel::after { content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:4px; height:4px; background:#4a2008; border-radius:50%; }
  .ts-wl { left:6px; } .ts-wr { left:46px; }
  .ts-stone { position:absolute; top:1px; left:22px; width:10px; height:8px; background:#ff3333; border:2px solid #ff8888; border-radius:50%; }
  .ts-stone::before { content:''; position:absolute; top:-5px; left:50%; transform:translateX(-50%); width:4px; height:5px; background:#cc2222; }
  .ts-horse { position:absolute; bottom:10px; right:0px; width:46px; height:42px; transform:scaleX(-1); animation:trot 0.55s ease-in-out infinite; }
  .ts-horse-body { position:absolute; bottom:14px; left:4px; width:30px; height:16px; background:#8B6914; border:2px solid #6B4914; border-radius:4px; }
  .ts-horse-neck { position:absolute; bottom:26px; left:2px; width:10px; height:14px; background:#8B6914; border:2px solid #6B4914; border-radius:4px 4px 0 0; transform-origin:bottom center; }
  .ts-horse-head { position:absolute; bottom:36px; left:0px; width:16px; height:10px; background:#8B6914; border:2px solid #6B4914; border-radius:4px; }
  .ts-horse-nose { position:absolute; bottom:34px; left:0px; width:6px; height:6px; background:#6B4914; border-radius:2px; }
  .ts-horse-ear  { position:absolute; bottom:44px; left:12px; width:4px; height:6px; background:#8B6914; border:2px solid #6B4914; }
  .ts-horse-mane { position:absolute; bottom:38px; left:10px; width:6px; height:8px; background:#5B3914; }
  .ts-horse-tail { position:absolute; bottom:20px; right:2px; width:6px; height:12px; background:#5B3914; border-radius:0 0 4px 4px; transform-origin:top center; }
  @keyframes trot { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-3px)} }
  @keyframes leg-f { 0%,100%{transform:rotate(10deg)} 50%{transform:rotate(-20deg)} }
  @keyframes leg-b { 0%,100%{transform:rotate(-10deg)} 50%{transform:rotate(20deg)} }
  .ts-horse-body,.ts-horse-neck,.ts-horse-head,.ts-horse-nose,.ts-horse-ear,.ts-horse-mane,.ts-horse-tail { animation:trot 0.55s ease-in-out infinite; }
  .ts-leg { position:absolute; width:5px; background:#4a2e10; border:2px solid #3a2208; transform-origin:top center; }
  .ts-leg-fl { height:14px; bottom:2px; left:8px;  animation:leg-f 0.55s ease-in-out infinite; }
  .ts-leg-fr { height:14px; bottom:2px; left:13px; animation:leg-b 0.55s ease-in-out infinite; }
  .ts-leg-bl { height:14px; bottom:2px; left:24px; animation:leg-b 0.55s ease-in-out infinite; }
  .ts-leg-br { height:14px; bottom:2px; left:29px; animation:leg-f 0.55s ease-in-out infinite; }
  .ts-hitch { position:absolute; bottom:20px; left:60px; width:22px; height:2px; background:#4a2008; }
  .op-header { background:#080c08; border-bottom:4px solid #33ff57; padding:16px 24px 12px; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; }
  .op-logo-eye  { font-family:'Press Start 2P',monospace; font-size:7px; color:#ffb700; letter-spacing:2px; margin-bottom:6px; }
  .op-logo-main { font-family:'Press Start 2P',monospace; font-size:20px; color:#33ff57; text-shadow:0 0 20px rgba(51,255,87,.4); margin-bottom:4px; }
  .op-logo-tag  { font-family:'VT323',monospace; font-size:16px; color:#d4b896; letter-spacing:2px; }
  .op-status { font-family:'Press Start 2P',monospace; font-size:6px; color:#1a8a2e; line-height:2; text-align:right; }
  .op-live  { color:#ff3333; animation:blink 1s step-end infinite; }
  .op-val   { color:#ffb700; }
  .op-nav { background:#071a0a; border-bottom:3px solid #1a8a2e; display:flex; overflow-x:auto; }
  .op-nav-btn { font-family:'Press Start 2P',monospace; font-size:7px; color:#33ff57; background:none; border:none; border-right:2px solid #1a8a2e; padding:12px 16px; cursor:pointer; white-space:nowrap; transition:background .15s; }
  .op-nav-btn:hover { background:#1a8a2e; color:#e8f0e8; }
  .op-nav-btn.active { background:#33ff57; color:#080c08; }
  .op-nav-btn::before { content:'> '; }
  .op-ticker { background:#a87700; border-bottom:3px solid #ffb700; overflow:hidden; padding:6px 0; white-space:nowrap; }
  .op-ticker-inner { display:inline-block; animation:ticker 32s linear infinite; font-family:'Press Start 2P',monospace; font-size:7px; color:#080c08; letter-spacing:1px; }
  .op-ticker-sep { margin:0 16px; color:#5a4400; }
  .op-wrap { max-width:1140px; margin:0 auto; padding:22px 18px; display:grid; grid-template-columns:1fr 280px; gap:22px; }
  .op-sh { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
  .op-sh h2 { font-family:'Press Start 2P',monospace; font-size:8px; color:#33ff57; white-space:nowrap; }
  .op-sh-line { flex:1; height:3px; background:repeating-linear-gradient(90deg,#1a8a2e 0,#1a8a2e 6px,transparent 6px,transparent 10px); }
  .op-feat { border:4px solid #33ff57; background:#0f1a0f; margin-bottom:22px; position:relative; }
  .op-feat-badge { position:absolute; top:0; left:0; background:#ffb700; color:#080c08; font-family:'Press Start 2P',monospace; font-size:6px; padding:4px 8px; z-index:2; }
  .op-feat-art { width:100%; height:180px; background:linear-gradient(135deg,#020d02 0%,#041a08 50%,#071a10 100%); display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
  .op-house { position:relative; width:160px; height:160px; flex-shrink:0; }
  .op-ring { position:absolute; border-radius:50%; top:50%; left:50%; transform:translate(-50%,-50%); border:2px solid; }
  .op-btn-dot { position:absolute; width:10px; height:10px; background:#ff3333; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:50%; }
  .op-cl { position:absolute; top:0; bottom:0; left:50%; width:2px; background:rgba(255,255,255,.08); }
  .op-tl { position:absolute; top:50%; left:0; right:0; height:2px; background:rgba(255,255,255,.08); }
  .op-st { position:absolute; width:14px; height:10px; border:3px solid; z-index:4; }
  .op-st::before { content:''; position:absolute; top:-6px; left:50%; transform:translateX(-50%); width:4px; height:6px; border:2px solid; border-color:inherit; }
  .op-art-lbl { position:absolute; right:16px; top:12px; text-align:right; }
  .op-art-lbl-m { font-family:'Press Start 2P',monospace; font-size:9px; color:#33ff57; text-shadow:0 0 10px #33ff57; line-height:1.6; }
  .op-art-lbl-s { font-family:'VT323',monospace; font-size:14px; color:#1a8a2e; letter-spacing:2px; }
  .op-feat-body { padding:18px 20px; }
  .op-meta   { font-family:'Press Start 2P',monospace; font-size:6px; color:#ffb700; margin-bottom:10px; display:flex; gap:16px; flex-wrap:wrap; }
  .op-ptitle { font-family:'Press Start 2P',monospace; font-size:10px; color:#e8f0e8; line-height:1.8; margin-bottom:10px; }
  .op-pexcerpt { font-family:'VT323',monospace; font-size:19px; color:#90c890; margin-bottom:14px; line-height:1.4; }
  .op-btn { display:inline-block; font-family:'Press Start 2P',monospace; font-size:7px; padding:10px 14px; cursor:pointer; border:none; transition:transform .1s,box-shadow .1s; text-decoration:none; }
  .op-btn-g { background:#33ff57; color:#080c08; box-shadow:4px 4px 0 #004400; }
  .op-btn-g:hover { transform:translate(2px,2px); box-shadow:2px 2px 0 #004400; }
  .op-btn-a { background:#ffb700; color:#080c08; box-shadow:4px 4px 0 #a87700; }
  .op-btn-a:hover { transform:translate(2px,2px); box-shadow:2px 2px 0 #a87700; }
  .op-btn-o { background:transparent; color:#33ff57; border:3px solid #1a8a2e; box-shadow:none; }
  .op-btn-o:hover { border-color:#33ff57; background:#071a0a; }
  .op-btn-r { background:#ff3333; color:#fff; box-shadow:4px 4px 0 #880000; }
  .op-btn-r:hover { transform:translate(2px,2px); box-shadow:2px 2px 0 #880000; }
  .op-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:22px; }
  .op-card { border:3px solid #1a8a2e; background:#0f1a0f; padding:14px; cursor:pointer; transition:border-color .15s; text-align:left; }
  .op-card:hover { border-color:#33ff57; }
  .op-ctag    { font-family:'Press Start 2P',monospace; font-size:6px; color:#ffb700; margin-bottom:8px; display:block; }
  .op-ctitle  { font-family:'Press Start 2P',monospace; font-size:7px; color:#e8f0e8; line-height:1.8; margin-bottom:8px; }
  .op-cexcerpt{ font-family:'VT323',monospace; font-size:17px; color:#78a878; margin-bottom:8px; line-height:1.3; }
  .op-cmeta   { font-family:'Press Start 2P',monospace; font-size:6px; color:#1a8a2e; }
  .op-write { border:4px solid #ffb700; background:#0f1a0f; margin-bottom:22px; }
  .op-write-head { background:#ffb700; padding:8px 13px; font-family:'Press Start 2P',monospace; font-size:8px; color:#080c08; display:flex; justify-content:space-between; }
  .op-write-body { padding:16px; }
  .op-input { width:100%; background:#080c08; border:3px solid #1a8a2e; color:#e8f0e8; font-family:'VT323',monospace; font-size:18px; padding:8px 10px; outline:none; transition:border-color .15s; box-sizing:border-box; }
  .op-input:focus { border-color:#33ff57; }
  .op-input::placeholder { color:#1a4a1a; }
  .op-input-title { font-family:'Press Start 2P',monospace; font-size:8px; height:42px; margin-bottom:9px; }
  .op-row { display:flex; gap:9px; margin-bottom:9px; flex-wrap:wrap; }
  .op-row .op-input { flex:1; min-width:110px; }
  .op-write-actions { display:flex; gap:9px; margin-top:11px; flex-wrap:wrap; }
  .op-pub-msg { font-family:'Press Start 2P',monospace; font-size:6px; color:#33ff57; margin-top:10px; animation:blink 1s step-end infinite; }
  .op-sidebar { display:flex; flex-direction:column; gap:18px; }
  .op-widget { border:3px solid #1a8a2e; background:#0f1a0f; }
  .op-whead { font-family:'Press Start 2P',monospace; font-size:7px; color:#080c08; background:#1a8a2e; padding:8px 12px; }
  .op-wbody { padding:12px; }
  .op-tbl { width:100%; border-collapse:collapse; font-family:'Press Start 2P',monospace; font-size:6px; }
  .op-tbl th { color:#ffb700; text-align:left; padding:5px 3px 7px; border-bottom:2px solid #1a8a2e; }
  .op-tbl td { color:#33ff57; padding:6px 3px; border-bottom:1px solid #071a0a; }
  .op-tbl tr.me td { color:#ffb700; }
  .op-tbl tr.me td:first-child::before { content:'> '; }
  .op-ri { display:flex; align-items:center; gap:6px; padding:6px 0; border-bottom:1px solid #071a0a; }
  .op-ri:last-child { border:none; }
  .op-rflag { font-size:12px; width:16px; text-align:center; flex-shrink:0; }
  .op-rname { font-family:'Press Start 2P',monospace; font-size:5px; color:#e8f0e8; flex:1; line-height:1.6; }
  .op-rrole { font-family:'Press Start 2P',monospace; font-size:5px; color:#ffb700; }
  .op-rcapt { color:#ff3333 !important; }
  .op-rsect { font-family:'Press Start 2P',monospace; font-size:6px; color:#ffb700; margin:8px 0 4px; }
  .op-si { padding:7px 0; border-bottom:1px solid #071a0a; font-family:'Press Start 2P',monospace; font-size:5.5px; line-height:1.8; }
  .op-si:last-child { border:none; }
  .op-sdate { color:#ffb700; } .op-sopp { color:#e8f0e8; } .op-su { color:#1a8a2e; }
  .op-stat { margin-bottom:10px; }
  .op-stat-lbl { font-family:'Press Start 2P',monospace; font-size:5.5px; color:#1a8a2e; display:flex; justify-content:space-between; margin-bottom:4px; }
  .op-stat-track { height:9px; background:#071a0a; border:2px solid #1a8a2e; }
  .op-stat-fill { height:100%; }
  .sf-g { background:#33ff57; } .sf-a { background:#ffb700; } .sf-r { background:#ff3333; }
  .op-nl-txt { font-family:'VT323',monospace; font-size:17px; color:#78a878; margin-bottom:10px; line-height:1.4; }
  .op-nl-msg { font-family:'Press Start 2P',monospace; font-size:6px; color:#33ff57; margin-top:8px; }
  .op-modal-bg { position:fixed; inset:0; background:rgba(0,0,0,.88); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; }
  .op-modal { background:#0f1a0f; border:4px solid #33ff57; max-width:680px; width:100%; max-height:80vh; overflow-y:auto; padding:24px; position:relative; }
  .op-modal-close { position:absolute; top:10px; right:10px; background:none; border:none; color:#ff3333; font-family:'Press Start 2P',monospace; font-size:7px; cursor:pointer; }
  .op-modal-close:hover { color:#ff8888; }
  @media(max-width:820px){ .op-wrap{grid-template-columns:1fr} .op-grid{grid-template-columns:1fr} }
`;

const OUTPOST_SCHEDULE = [
  {date:"MON APR 6",  opp:"VS ALPINE CC",    time:"12:00 PM ET"},
  {date:"TUE APR 7",  opp:"VS NORTHERN UTD", time:"7:00 PM ET"},
  {date:"WED APR 8",  opp:"VS TYPHOON CC",   time:"3:30 PM ET"},
  {date:"THU APR 9",  opp:"VS SHIELD CC",    time:"7:00 PM ET"},
  {date:"FRI APR 10", opp:"VS MAPLE UTD",    time:"12:00 PM ET"},
  {date:"SAT APR 11", opp:"MIXED FOURS DAY", time:"TBD SEED"},
  {date:"SUN APR 12", opp:"PLAYOFFS + FINAL",time:"4:00 PM ET"},
];

const ROSTER_MEN = [
  {flag:"🇺🇸", name:"K. DROPKIN",      role:"CAPTAIN", captain:true},
  {flag:"🇺🇸", name:"J. SHUSTER",      role:"SKIP"},
  {flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", name:"G. HARDIE",       role:"THIRD"},
  {flag:"🇨🇦", name:"E.J. HARNDEN",   role:"SECOND"},
  {flag:"🇺🇸", name:"D. CASPER",       role:"LEAD"},
];
const ROSTER_WOMEN = [
  {flag:"🇮🇹", name:"S. CONSTANTINI", role:"SKIP"},
  {flag:"🇺🇸", name:"T. PETERSON",    role:"THIRD"},
  {flag:"🇺🇸", name:"T. ANDERSON-HEIDE", role:"SECOND"},
  {flag:"🇨🇦", name:"S. WILKES",      role:"LEAD"},
  {flag:"🇺🇸", name:"C. THIESSE",     role:"MXD DBL"},
];

const TICKER_ITEMS = [
  "ROCK LEAGUE DEBUTS APR 6 IN TORONTO","FRONTIER VS ALPINE CC — MON 12PM ET",
  "DROPKIN & THIESSE: FRESH OFF OLYMPIC SILVER","PIN TO WIN: BUTTON = 2 PTS IN FINAL END",
  "PRIZE PURSE: $250,000 USD","WATCH LIVE: CBC GEM & FLOLIVE",
  "FRONTIER CURLING CLUB — THE ONLY US FRANCHISE","SEVEN ENDS. EVERY ONE COUNTS.",
];

function OutpostTrailScene() {
  const stars = [
    {w:4,h:4,top:"7px", left:"6%", d:".0s",dur:"2.2s"},
    {w:2,h:2,top:"17px",left:"15%",d:".4s",dur:"3.1s"},
    {w:3,h:3,top:"5px", left:"28%",d:".2s",dur:"1.8s"},
    {w:2,h:2,top:"22px",left:"40%",d:".7s",dur:"2.7s"},
    {w:4,h:4,top:"9px", left:"55%",d:".1s",dur:"2.0s"},
    {w:2,h:2,top:"14px",left:"68%",d:".5s",dur:"3.3s"},
    {w:3,h:3,top:"4px", left:"78%",d:".3s",dur:"1.9s"},
  ];
  const mtns = [
    {bl:0, br:62,bb:50,col:"#0d2240"},
    {bl:48,br:48,bb:65,col:"#0a1c38"},
    {bl:52,br:28,bb:55,col:"#081830"},
    {bl:38,br:55,bb:72,col:"#061428"},
  ];
  const trees = [
    {left:"5%", s1:13,b1:20,s2:17,b2:24,tw:6,th:15},
    {left:"18%",s1:9, b1:15,s2:13,b2:19,tw:5,th:12},
    {left:"32%",s1:11,b1:18,s2:15,b2:22,tw:6,th:14},
    {left:"72%",s1:10,b1:16,s2:14,b2:20,tw:5,th:13},
    {left:"85%",s1:12,b1:19,s2:16,b2:23,tw:6,th:14},
  ];
  return (
    <div className="trail-scene">
      <div className="ts-sky"/>
      {stars.map((s,i)=><div key={i} className="ts-star" style={{width:s.w,height:s.h,top:s.top,left:s.left,"--d":s.d,"--dur":s.dur}}/>)}
      <div className="ts-moon"/>
      <div className="ts-mtn-wrap">
        {mtns.map((m,i)=><div key={i} className="ts-mtn" style={{borderLeft:`${m.bl}px solid transparent`,borderRight:`${m.br}px solid transparent`,borderBottom:`${m.bb}px solid ${m.col}`}}/>)}
      </div>
      <div className="ts-ground"><div className="ts-trail"/></div>
      {trees.map((t,i)=>(
        <div key={i} className="ts-tree" style={{left:t.left}}>
          <div className="ts-top" style={{borderLeft:`${t.s1}px solid transparent`,borderRight:`${t.s1}px solid transparent`,borderBottom:`${t.b1}px solid #0a3010`}}/>
          <div className="ts-top" style={{borderLeft:`${t.s2}px solid transparent`,borderRight:`${t.s2}px solid transparent`,borderBottom:`${t.b2}px solid #0d3a14`}}/>
          <div className="ts-trunk" style={{width:t.tw,height:t.th}}/>
        </div>
      ))}
      <div className="ts-wagon">
        <div className="ts-horse">
          <div className="ts-hitch"/>
          <div className="ts-horse-tail"/>
          <div className="ts-horse-body"/>
          <div className="ts-horse-neck"/>
          <div className="ts-horse-head"/>
          <div className="ts-horse-nose"/>
          <div className="ts-horse-ear"/>
          <div className="ts-horse-mane"/>
          <div className="ts-leg ts-leg-fl"/>
          <div className="ts-leg ts-leg-fr"/>
          <div className="ts-leg ts-leg-bl"/>
          <div className="ts-leg ts-leg-br"/>
        </div>
        <div className="ts-wcover"/>
        <div className="ts-wbody"><div className="ts-stone"/></div>
        <div className="ts-wheel ts-wl"/>
        <div className="ts-wheel ts-wr"/>
      </div>
    </div>
  );
}

function OutpostHouseArt() {
  return (
    <div className="op-feat-art">
      <div className="op-house">
        <div className="op-cl"/><div className="op-tl"/>
        <div className="op-ring" style={{width:160,height:160,borderColor:"rgba(255,255,255,.06)"}}/>
        <div className="op-ring" style={{width:116,height:116,borderColor:"rgba(200,40,40,.28)"}}/>
        <div className="op-ring" style={{width:72, height:72, borderColor:"rgba(200,40,40,.5)"}}/>
        <div className="op-ring" style={{width:26, height:26, borderColor:"rgba(200,40,40,.8)"}}/>
        <div className="op-btn-dot"/>
        <div className="op-st" style={{background:"#ff3333",borderColor:"#ff8888",top:"calc(50% - 40px)",left:"calc(50% - 7px)"}}/>
        <div className="op-st" style={{background:"#ff3333",borderColor:"#ff8888",top:"calc(50% + 24px)",left:"calc(50% - 30px)"}}/>
        <div className="op-st" style={{background:"#4488ff",borderColor:"#88aaff",top:"calc(50% + 10px)",left:"calc(50% + 16px)"}}/>
      </div>
      <div className="op-art-lbl">
        <div className="op-art-lbl-m">TORONTO<br/>WEEK ONE</div>
        <div className="op-art-lbl-s">APR 6 - 12</div>
      </div>
    </div>
  );
}

/* ============================================================
   ARTICLE READER
   ============================================================ */
function ArticleReader({ post, onBack }) {
  return (
    <div style={{background:"#0f0f0f",minHeight:"100vh"}}>
      <div style={{
        background:`linear-gradient(160deg, #111 0%, #0a150a 60%, #0a0a0a 100%)`,
        borderBottom:`4px solid ${T.gold}`,
        padding:"64px 24px 48px",
      }}>
        <div style={{maxWidth:780,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:28,flexWrap:"wrap"}}>
            <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:12,letterSpacing:2,color:T.gold}}>
              ← THE OUTPOST
            </button>
            <span style={{color:T.grey4,fontSize:11}}>/ {post.tag}</span>
          </div>
          <div style={{display:"inline-block",background:T.gold,color:"#000",fontFamily:"'Bebas Neue',sans-serif",fontSize:12,letterSpacing:3,padding:"4px 12px",marginBottom:20}}>
            {post.tag}
          </div>
          <h1 style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(36px,5vw,72px)",
            letterSpacing:3, lineHeight:1.05,
            color:T.white, marginBottom:20,
          }}>{post.title}</h1>
          <p style={{
            fontFamily:"'Playfair Display',serif",
            fontStyle:"italic", fontSize:20,
            color:T.grey5, lineHeight:1.7,
            borderLeft:`3px solid ${T.gold}`, paddingLeft:18,
            marginBottom:28,
          }}>{post.excerpt}</p>
          <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
            <div style={{width:40,height:40,background:T.grey3,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:T.gold}}>
              {post.author?.charAt(0)||"J"}
            </div>
            <div>
              <div style={{fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:13,color:T.white}}>{post.author}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:T.grey5}}>{post.date} — {post.readTime}</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{maxWidth:780,margin:"0 auto",padding:"56px 24px 80px"}}>
        {post.body.split("\n\n").map((para, i) => {
          const isSubhead = para.length < 80 && para === para.toUpperCase() && para.trim().length > 3;
          if (isSubhead) return (
            <h2 key={i} style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:28, letterSpacing:3,
              color:T.white, marginBottom:18, marginTop:40,
              borderBottom:`2px solid ${T.grey3}`, paddingBottom:10,
            }}>{para}</h2>
          );
          return (
            <p key={i} style={{
              fontFamily:"'Inter',sans-serif",
              fontSize:18, lineHeight:1.85,
              color:"#c8c8c8", marginBottom:28,
            }}>{para}</p>
          );
        })}
        <div style={{borderTop:`2px solid ${T.grey3}`,paddingTop:36,marginTop:48,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:4,color:T.gold,marginBottom:4}}>THE CURLING GUYS</div>
            <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:T.grey5}}>A Curling Guys Production — The Outpost</div>
          </div>
          <button onClick={onBack} style={{background:T.gold,color:"#000",fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:12,letterSpacing:2,padding:"12px 24px",border:"none",cursor:"pointer"}}>
            ← BACK TO THE OUTPOST
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   OUTPOST PAGE
   ============================================================ */
function OutpostPage() {
  const [subPage, setSubPage]       = useState("home");
  const [posts, setPosts]           = useState(OUTPOST_POSTS);
  const [selectedPost, setSelectedPost] = useState(null);
  const [form, setForm]             = useState({title:"",tag:"",date:"",excerpt:"",body:""});
  const [pubMsg, setPubMsg]         = useState(false);
  const [nlEmail, setNlEmail]       = useState("");
  const [nlSub, setNlSub]           = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editPost, setEditPost]     = useState(null);

  useEffect(()=>{
    (async()=>{
      try{ const s=await window.storage.get("op-posts"); if(s?.value) setPosts(JSON.parse(s.value)); }catch{}
    })();
  },[]);

  useEffect(()=>{
    (async()=>{ try{ await window.storage.set("op-posts",JSON.stringify(posts)); }catch{} })();
  },[posts]);

  function publishPost() {
    if (!form.title.trim()||!form.excerpt.trim()) return;
    setPosts(prev=>[{
      id:Date.now(), tag:form.tag.trim().toUpperCase()||"DISPATCH",
      title:form.title, date:form.date||new Date().toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"}).toUpperCase(),
      excerpt:form.excerpt, body:form.body, author:"THE CURLING GUYS", readTime:"3 MIN READ", featured:false,
    },...prev]);
    setForm({title:"",tag:"",date:"",excerpt:"",body:""});
    setPubMsg(true); setTimeout(()=>setPubMsg(false),3000);
  }

  function deletePost(id){ setPosts(p=>p.filter(x=>x.id!==id)); setDeleteConfirm(null); }
  function saveEdit(){ if(!editPost)return; setPosts(p=>p.map(x=>x.id===editPost.id?{...x,...editPost}:x)); setEditPost(null); }

  if (selectedPost) return <ArticleReader post={selectedPost} onBack={()=>setSelectedPost(null)}/>;

  const featuredPost = posts.find(p=>p.featured)||posts[0];
  const otherPosts   = posts.filter(p=>p.id!==featuredPost?.id);

  return (
    <>
      <style>{OP_CSS}</style>
      <div className="op-root">
        <OutpostTrailScene/>
        <div className="op-header">
          <div>
            <div className="op-logo-eye">FRONTIER CURLING CLUB</div>
            <div className="op-logo-main">THE OUTPOST</div>
            <div className="op-logo-tag">DISPATCHES FROM THE EDGE OF THE SHEET</div>
          </div>
          <div className="op-status">
            <div><span className="op-live">* LIVE *</span> ROCK LEAGUE — TORONTO</div>
            <div>MILES TRAVELED: <span className="op-val">1,247</span></div>
            <div>TEAM HEALTH: <span className="op-val">GOOD</span></div>
            <div>MORALE: <span className="op-val">FRONTIER STRONG</span></div>
          </div>
        </div>
        <div className="op-nav">
          {["HOME","ARTICLES","ROSTER","SCHEDULE","WRITE"].map(n=>(
            <button key={n} className={`op-nav-btn${subPage===n.toLowerCase()?" active":""}`} onClick={()=>setSubPage(n.toLowerCase())}>{n}</button>
          ))}
        </div>
        <div className="op-ticker">
          <span className="op-ticker-inner">
            {TICKER_ITEMS.map((t,i)=><span key={i}>{t}<span className="op-ticker-sep">***</span></span>)}
          </span>
        </div>
        <div className="op-wrap">
          <main>
            {/* HOME */}
            {subPage==="home" && (
              <>
                <div className="op-sh"><h2>FEATURED</h2><div className="op-sh-line"/></div>
                {featuredPost && (
                  <div className="op-feat">
                    <div className="op-feat-badge">* FEATURED *</div>
                    <OutpostHouseArt/>
                    <div className="op-feat-body">
                      <div className="op-meta"><span>{featuredPost.date}</span><span>{featuredPost.readTime}</span></div>
                      <div className="op-ptitle">{featuredPost.title}</div>
                      <div className="op-pexcerpt">{featuredPost.excerpt}</div>
                      <button className="op-btn op-btn-g" onClick={()=>setSelectedPost(featuredPost)}>READ FULL DISPATCH &gt;</button>
                    </div>
                  </div>
                )}
                <div className="op-sh"><h2>LATEST DISPATCHES</h2><div className="op-sh-line"/></div>
                <div className="op-grid">
                  {otherPosts.map(p=>(
                    <div key={p.id} className="op-card" onClick={()=>setSelectedPost(p)}>
                      <span className="op-ctag">{p.tag}</span>
                      <div className="op-ctitle">{p.title}</div>
                      <div className="op-cexcerpt">{p.excerpt}</div>
                      <div className="op-cmeta">{p.date} // {p.author}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ARTICLES */}
            {subPage==="articles" && (
              <>
                <div className="op-sh"><h2>ALL DISPATCHES</h2><div className="op-sh-line"/></div>
                <div className="op-grid">
                  {posts.map(p=>(
                    <div key={p.id} className="op-card" onClick={()=>setSelectedPost(p)}>
                      <span className="op-ctag">{p.tag}{p.featured?" // FEATURED":""}</span>
                      <div className="op-ctitle">{p.title}</div>
                      <div className="op-cexcerpt">{p.excerpt}</div>
                      <div className="op-cmeta">{p.date} // {p.author}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ROSTER */}
            {subPage==="roster" && (
              <>
                <div className="op-sh"><h2>FRONTIER ROSTER</h2><div className="op-sh-line"/></div>
                <div style={{border:"4px solid #33ff57",background:"#0f1a0f",padding:"20px",marginBottom:22}}>
                  <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"7px",color:"#ffb700",marginBottom:"12px"}}>MEN'S FOURS</div>
                  {ROSTER_MEN.map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #071a0a"}}>
                      <div style={{fontSize:"18px",width:"24px",textAlign:"center"}}>{r.flag}</div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"8px",color:r.captain?"#ff3333":"#e8f0e8"}}>{r.name}</div>
                        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"6px",color:"#ffb700",marginTop:"4px"}}>{r.role}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"7px",color:"#ffb700",margin:"16px 0 12px"}}>WOMEN'S FOURS</div>
                  {ROSTER_WOMEN.map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #071a0a"}}>
                      <div style={{fontSize:"18px",width:"24px",textAlign:"center"}}>{r.flag}</div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"8px",color:"#e8f0e8"}}>{r.name}</div>
                        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"6px",color:"#ffb700",marginTop:"4px"}}>{r.role}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{marginTop:"14px",paddingTop:"12px",borderTop:"2px solid #1a8a2e",fontFamily:"'Press Start 2P',monospace",fontSize:"6px",color:"#1a8a2e"}}>
                    GENERAL MANAGER: <span style={{color:"#e8f0e8"}}>CHRIS PLYS</span>
                  </div>
                </div>
              </>
            )}

            {/* SCHEDULE */}
            {subPage==="schedule" && (
              <>
                <div className="op-sh"><h2>2026 SCHEDULE</h2><div className="op-sh-line"/></div>
                <div style={{border:"4px solid #33ff57",background:"#0f1a0f",padding:"20px",marginBottom:22}}>
                  {OUTPOST_SCHEDULE.map((s,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:"1px solid #071a0a"}}>
                      <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"6px",color:"#ffb700",width:"90px",flexShrink:0}}>{s.date}</div>
                      <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"7px",color:"#e8f0e8",flex:1}}>{s.opp}</div>
                      <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"6px",color:"#1a8a2e",flexShrink:0}}>{s.time}</div>
                    </div>
                  ))}
                  <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"6px",color:"#ffb700",marginTop:"16px"}}>
                    PRIZE PURSE: $250,000 USD // CHAMPION: $100,000
                  </div>
                </div>
              </>
            )}

            {/* WRITE */}
            {subPage==="write" && (
              <>
                <div className="op-sh"><h2>WRITE A DISPATCH</h2><div className="op-sh-line"/></div>
                <div className="op-write">
                  <div className="op-write-head"><span>+ NEW DISPATCH</span><span style={{color:"#5a4400"}}>THE OUTPOST CMS</span></div>
                  <div className="op-write-body">
                    <input className="op-input op-input-title" placeholder="POST TITLE..." value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))}/>
                    <div className="op-row">
                      <input className="op-input" placeholder="CATEGORY TAG..." value={form.tag}  onChange={e=>setForm(p=>({...p,tag:e.target.value}))}/>
                      <input className="op-input" placeholder="DATE..."          value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}/>
                    </div>
                    <textarea className="op-input" rows={3}  placeholder="SHORT EXCERPT (shown in cards)..." value={form.excerpt} onChange={e=>setForm(p=>({...p,excerpt:e.target.value}))} style={{marginBottom:9,resize:"vertical"}}/>
                    <textarea className="op-input" rows={8}  placeholder="FULL ARTICLE BODY..." value={form.body} onChange={e=>setForm(p=>({...p,body:e.target.value}))} style={{resize:"vertical"}}/>
                    <div className="op-write-actions">
                      <button className="op-btn op-btn-a" onClick={publishPost}>PUBLISH DISPATCH</button>
                      <button className="op-btn op-btn-o" onClick={()=>setForm({title:"",tag:"",date:"",excerpt:"",body:""})}>CLEAR</button>
                    </div>
                    {pubMsg && <div className="op-pub-msg">* DISPATCH PUBLISHED. GO FRONTIER.</div>}
                  </div>
                </div>
                <div className="op-sh"><h2>MANAGE DISPATCHES</h2><div className="op-sh-line"/></div>
                {posts.map(p=>(
                  <div key={p.id} style={{border:"3px solid #1a8a2e",background:"#0f1a0f",padding:"12px",marginBottom:"8px",display:"flex",alignItems:"flex-start",gap:"12px"}}>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"6px",color:"#ffb700",marginBottom:"4px"}}>{p.tag}</div>
                      <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"7px",color:"#e8f0e8",marginBottom:"4px"}}>{p.title}</div>
                      <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"5px",color:"#1a8a2e"}}>{p.date}</div>
                    </div>
                    <div style={{display:"flex",gap:"6px",flexShrink:0}}>
                      <button className="op-btn op-btn-o" style={{fontSize:"5px",padding:"6px 8px"}} onClick={()=>setEditPost({...p})}>EDIT</button>
                      <button className="op-btn op-btn-r" style={{fontSize:"5px",padding:"6px 8px"}} onClick={()=>setDeleteConfirm(p.id)}>DEL</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </main>

          {/* SIDEBAR */}
          <aside className="op-sidebar">
            <div className="op-widget">
              <div className="op-whead">// STANDINGS</div>
              <div className="op-wbody">
                <table className="op-tbl">
                  <thead><tr><th>TEAM</th><th>W</th><th>L</th><th>PTS</th></tr></thead>
                  <tbody>
                    <tr><td>MAPLE UTD</td><td>0</td><td>0</td><td>0</td></tr>
                    <tr><td>SHIELD CC</td><td>0</td><td>0</td><td>0</td></tr>
                    <tr className="me"><td>FRONTIER</td><td>0</td><td>0</td><td>0</td></tr>
                    <tr><td>NORTHERN</td><td>0</td><td>0</td><td>0</td></tr>
                    <tr><td>ALPINE CC</td><td>0</td><td>0</td><td>0</td></tr>
                    <tr><td>TYPHOON</td><td>0</td><td>0</td><td>0</td></tr>
                  </tbody>
                </table>
                <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"5px",color:"#1a8a2e",marginTop:"8px"}}>UPDATED DAILY // APR 6-12</div>
              </div>
            </div>
            <div className="op-widget">
              <div className="op-whead">// FRONTIER INTEL</div>
              <div className="op-wbody">
                {[{l:"SHOT %",v:"TBD",p:0,c:"sf-g"},{l:"STEAL %",v:"TBD",p:0,c:"sf-a"},{l:"HAMMER %",v:"TBD",p:0,c:"sf-g"},{l:"OPP SHOT %",v:"TBD",p:0,c:"sf-r"}].map(s=>(
                  <div key={s.l} className="op-stat">
                    <div className="op-stat-lbl"><span>{s.l}</span><span>{s.v}</span></div>
                    <div className="op-stat-track"><div className={`op-stat-fill ${s.c}`} style={{width:s.p+"%"}}/></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="op-widget">
              <div className="op-whead">// ROSTER</div>
              <div className="op-wbody">
                <div className="op-rsect">MEN</div>
                {ROSTER_MEN.map((r,i)=>(
                  <div key={i} className="op-ri">
                    <div className="op-rflag">{r.flag}</div>
                    <div className="op-rname">{r.name}</div>
                    <div className={`op-rrole${r.captain?" op-rcapt":""}`}>{r.role}</div>
                  </div>
                ))}
                <div className="op-rsect">WOMEN</div>
                {ROSTER_WOMEN.map((r,i)=>(
                  <div key={i} className="op-ri">
                    <div className="op-rflag">{r.flag}</div>
                    <div className="op-rname">{r.name}</div>
                    <div className="op-rrole">{r.role}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="op-widget">
              <div className="op-whead">// SCHEDULE</div>
              <div className="op-wbody">
                {OUTPOST_SCHEDULE.map((s,i)=>(
                  <div key={i} className="op-si">
                    <div className="op-sdate">{s.date}</div>
                    <div className="op-sopp">{s.opp}</div>
                    <div className="op-su">{s.time}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="op-widget">
              <div className="op-whead">// JOIN THE OUTPOST</div>
              <div className="op-wbody">
                <div className="op-nl-txt">Get Frontier dispatches delivered.</div>
                {!nlSub ? (
                  <>
                    <input className="op-input" type="email" placeholder="YOUR EMAIL..." value={nlEmail} onChange={e=>setNlEmail(e.target.value)} style={{marginBottom:8}}/>
                    <button className="op-btn op-btn-g" style={{width:"100%",textAlign:"center"}} onClick={()=>nlEmail&&setNlSub(true)}>SUBSCRIBE</button>
                  </>
                ) : <div className="op-nl-msg">* YOU'RE ON THE LIST. GO FRONTIER.</div>}
              </div>
            </div>
            <div className="op-widget">
              <div className="op-whead">// FOLLOW</div>
              <div className="op-wbody">
                <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"5.5px",color:"#33ff57",lineHeight:2}}>
                  TIKTOK: @the.curling.guys<br/>
                  EMAIL: sponsors@thecurlingguys.com<br/>
                  <span style={{color:"#ffb700"}}>A CURLING GUYS PRODUCTION</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* DELETE MODAL */}
        {deleteConfirm && (
          <div className="op-modal-bg" onClick={()=>setDeleteConfirm(null)}>
            <div className="op-modal" onClick={e=>e.stopPropagation()}>
              <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"9px",color:"#ff3333",marginBottom:"12px"}}>DELETE DISPATCH?</div>
              <div style={{fontFamily:"'VT323',monospace",fontSize:"19px",color:"#90c890",marginBottom:"16px"}}>This cannot be undone. Are you sure?</div>
              <div style={{display:"flex",gap:"8px"}}>
                <button className="op-btn op-btn-r" onClick={()=>deletePost(deleteConfirm)}>YES, DELETE</button>
                <button className="op-btn op-btn-o" onClick={()=>setDeleteConfirm(null)}>CANCEL</button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT MODAL */}
        {editPost && (
          <div className="op-modal-bg" onClick={()=>setEditPost(null)}>
            <div className="op-modal" onClick={e=>e.stopPropagation()}>
              <button className="op-modal-close" onClick={()=>setEditPost(null)}>X CLOSE</button>
              <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:"8px",color:"#ffb700",marginBottom:"12px"}}>EDIT DISPATCH</div>
              <input className="op-input op-input-title" value={editPost.title} onChange={e=>setEditPost(p=>({...p,title:e.target.value}))} style={{marginBottom:9}}/>
              <div className="op-row" style={{marginBottom:"9px"}}>
                <input className="op-input" placeholder="TAG"  value={editPost.tag}  onChange={e=>setEditPost(p=>({...p,tag:e.target.value}))}/>
                <input className="op-input" placeholder="DATE" value={editPost.date} onChange={e=>setEditPost(p=>({...p,date:e.target.value}))}/>
              </div>
              <textarea className="op-input" rows={3} value={editPost.excerpt} onChange={e=>setEditPost(p=>({...p,excerpt:e.target.value}))} style={{marginBottom:9,resize:"vertical"}}/>
              <textarea className="op-input" rows={7} value={editPost.body}    onChange={e=>setEditPost(p=>({...p,body:e.target.value}))}    style={{resize:"vertical"}}/>
              <div style={{display:"flex",gap:"9px",marginTop:"12px"}}>
                <button className="op-btn op-btn-a" onClick={saveEdit}>SAVE CHANGES</button>
                <button className="op-btn op-btn-o" onClick={()=>setEditPost(null)}>CANCEL</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ============================================================
   SITE FOOTER
   ============================================================ */
function SiteFooter({ setPage }) {
  return (
    <footer style={{background:"#080808",borderTop:`2px solid ${T.grey3}`,padding:"56px 32px 32px"}}>
      <div style={{maxWidth:1160,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:48,marginBottom:48}}>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:3,color:T.gold,marginBottom:12}}>THE CURLING GUYS</div>
            <div style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:T.grey5,lineHeight:1.7}}>Competitive curling. Real content. Based in Minneapolis at Frogtown Curling Club.</div>
          </div>
          {[
            {head:"NAVIGATE", links:[["HOME","home"],["THE CURLING GUYS","team"],["THE OUTPOST","outpost"],["VIDEOS","videos"]]},
            {head:"CONNECT",  links:[["TikTok","https://tiktok.com/@the.curling.guys"],["Contact","contact"],["Sponsors","sponsors"],["Merch","merch"]]},
            {head:"COVERAGE", links:[["The Outpost","outpost"],["Rock League","outpost"],["Frogtown CC","team"],["Bonspiels","videos"]]},
          ].map((col,i)=>(
            <div key={i}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:4,color:T.gold,marginBottom:16}}>{col.head}</div>
              {col.links.map(([label,target],j)=>(
                <div key={j} style={{marginBottom:8}}>
                  <button onClick={()=>setPage(target)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:13,color:T.grey5,padding:0,textAlign:"left"}}>
                    {label}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${T.grey3}`,paddingTop:24,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:T.grey4}}>© 2026 The Curling Guys. All rights reserved.</div>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:T.grey4}}>sponsors@thecurlingguys.com</div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
export default function App() {
  const [page, setPage]             = useState("home");
  const [siteArticle, setSiteArticle] = useState(null);

  function navigate(p) {
    setSiteArticle(null);
    setPage(p);
  }

  const renderPage = () => {
    if (siteArticle) {
      return <ArticleReader post={siteArticle} onBack={()=>setSiteArticle(null)}/>;
    }
    switch(page) {
      case "home":     return <HomePage setPage={navigate} openArticle={setSiteArticle}/>;
      case "team":     return <TeamPage/>;
      case "outpost":  return <OutpostPage/>;
      case "sponsors": return <SponsorsPage/>;
      case "merch":    return <MerchPage/>;
      case "videos":   return <VideosPage/>;
      case "contact":  return <ContactPage/>;
      default:         return <HomePage setPage={navigate} openArticle={setSiteArticle}/>;
    }
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <SiteNav page={page} setPage={navigate}/>
      {renderPage()}
      {page !== "outpost" && !siteArticle && <SiteFooter setPage={navigate}/>}
    </>
  );
}
