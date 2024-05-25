console.log("inject new script.");
(()=>{
    var a = document.createElement("script");
    a.src = chrome.runtime.getURL("injected.js");
    a.onload = function() {
        this.remove()
    }
    ;
    (document.head || document.documentElement).appendChild(a)
}
)();
var auto_extract_flag = !1
  , leads = []
  , leads_lnglat = new Set
  , collect_email = true
  , processing_leads = 0;
(()=>{
    var a = document.createElement("div");
    a.className = "extension_gms_page bm_scrollbarMask";
    var f = document.createElement("h1");
    f.id = "extension_gms_leads_info";
    f.className = "extension_gms_info";
    const b = document.createElement("button");
    b.className = "extension_gms_button";
    b.innerText = "Start Auto Extract";
    b.id = "extension_gms_start_btn";
    b.addEventListener("click", async g=>{
        g = g.target;
        if (auto_extract_flag)
            g.innerText = "Start Auto Extract",
            auto_extract_flag = !1,
            console.log("Begin to stop auto extract!");
        else {
            g.innerText = "Stop Auto Extract";
            g.style = "background-color: #ea4335";
            auto_extract_flag = !0;
            for (console.log("Begin to start auto extract!"); auto_extract_flag; ) {
                var k = document.querySelectorAll(".bm_svrpagination .bm_rightChevron");
                if (k = k[k.length - 1])
                    if ("none" != window.getComputedStyle(k).getPropertyValue("display"))
                        console.log("Paging"),
                        k.click(),
                        await new Promise(m=>setTimeout(m, 1E3 * Math.floor(3 * Math.random() + 3)));
                    else {
                        console.log("No more results.");
                        break
                    }
                else {
                    console.log("No more results.");
                    break
                }
            }
            g.innerText = "Start Auto Extract";
            g.style = "";
            auto_extract_flag = !1;
            console.log("Finish auto extract!");
            alert("No more results, move the map and click auto extract again!")
        }
    }
    );
    const d = document.createElement("button");
    d.className = "extension_gms_button";
    d.innerText = "Export Leads (0)";
    d.id = "extension_gms_download_btn";
    d.style = "background-color: #54aced";
    d.addEventListener("click", async()=>{
        chrome.runtime.sendMessage({
            action: "openPage",
            data: leads
        });
        console.log("leads: ", leads)
    }
    );
    const h = document.createElement("button");
    h.className = "extension_gms_button";
    h.innerText = "Clear";
    h.id = "extension_gms_clear_btn";
    h.style = "background-color: #4167b2";
    h.addEventListener("click", async()=>{
        window.leads = [];
        window.leads_lnglat.clear();
        f.innerHTML = "Leads: 0";
        d.innerText = "Export Leads (0)"
    }
    );
    a.appendChild(f);
    a.appendChild(b);
    a.appendChild(d);
    a.appendChild(h);
    document.body.insertBefore(a, document.body.firstChild)
}
)();
function decode_cf_email(a) {
    s = "";
    r = parseInt(a.substr(0, 2), 16);
    for (j = 2; a.length - j; j += 2)
        c = parseInt(a.substr(j, 2), 16) ^ r,
        s += String.fromCharCode(c);
    return s
}
function get_domain(a) {
    const f = new Set("ac ad ae af ag ai al am an ao aq ar as at au aw ax az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cd cf cg ch ci ck cl cm cn co cr cu cv cw cx cy cz de dj dk dm do dz ec ee eg eh er es et eu fi fj fk fm fo fr ga gb gd ge gf gg gh gi gl gm gn gp gq gr gs gt gu gw gy hk hm hn hr ht hu id ie il im in io iq ir is it je jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md me mf mg mh mk ml mm mn mo mp mq mr ms mt mu mv mw mx my mz na nc ne nf ng ni nl no np nr nu nz om pa pe pf pg ph pk pl pm pn pr ps pt pw py qa re ro rs ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr ss st su sv sx sy sz tc td tf tg th tj tk tl tm tn to tr tt tv tw tz ua ug uk us uy uz va vc ve vg vi vn vu wf ws xk ye yt za zm zw".split(" "));
    a = (new URL(a)).host.toLowerCase().split(".");
    return f.has(a[a.length - 1]) ? a[a.length - 3] : a[a.length - 2]
}
function normalize_social_link(a) {
    try {
        a.startsWith("//") && (a = "https:" + a);
        a.startsWith("http") || (a = "https://" + a);
        const f = new Set("/reel /about /tr /privacy /download /pg /settings /vp /profiles".split(" "));
        let b = new URL(a);
        if ("http:" === b.protocol || "" === b.protocol)
            b.protocol = "https:";
        "instagram.com" === b.host && (b.host = "www.instagram.com");
        "facebook.com" === b.host && (b.host = "www.facebook.com");
        "yelp.com" === b.host && (b.host = "www.yelp.com");
        "www.twitter.com" === b.host && (b.host = "twitter.com");
        "/" === b.pathname[b.pathname.length - 1] && (b.pathname = b.pathname.slice(0, -1));
        return f.has(b.pathname) ? "" : b.toString()
    } catch (f) {
        console.warn("normalize_social_link error: ", a, f)
    }
    return ""
}
async function extractemail(a, f, b) {
    try {
        a.startsWith("//") && (a = "https:" + a);
        a.startsWith("http") || (a = "https://" + a);
        const u = await chrome.runtime.sendMessage({
            action: "access",
            data: {
                url: a
            }
        });
        if (10 > u.length)
            console.warn("visit error: ", a);
        else {
            var d = u.normalize("NFKC");
            f = {
                instagram: /(((http|https):\/\/)?((www\.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9_.]{2,30})))/ig,
                facebook: /(?:https?:)?\/\/(?:www\.)?(?:facebook|fb)\.com\/((?![A-z]+\.php)(?!marketplace|gaming|watch|me|messages|help|search|groups)[A-z0-9_\-\.]+)\/?/ig,
                youtube: /(?:https?:)?\/\/(?:[A-z]+\.)?youtube\.com\/(channel\/([A-z0-9-_]+)|user\/([A-z0-9]+))\/?/ig,
                linkedin: /(?:https?:)?\/\/(?:[\w]+\.)?linkedin\.com\/((company|school)\/[A-z0-9-\u00c0-\u00ff\.]+|in\/[\w\-_\u00c0-\u00ff%]+)\/?/ig,
                twitter: /(?:(?:http|https):\/\/)?(?:www.)?(?:twitter.com)\/(?!(oauth|account|tos|privacy|signup|home|hashtag|search|login|widgets|i|settings|start|share|intent|oct)(['"\?\.\/]|$))([A-Za-z0-9_]{1,15})/igm,
                email: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
                yelp: /https?:\/\/(www\.)?yelp\.com\/biz\/[a-zA-Z0-9_-]+/ig
            };
            var h = new Set
              , g = {};
            for (const e in f) {
                g[e] = new Set;
                var k = d.match(f[e]);
                k && k.forEach(l=>{
                    l && ("email" === e ? g[e].add(l) : (l = normalize_social_link(l)) && g[e].add(l))
                }
                )
            }
            var m = new URL(a);
            try {
                var q = (new DOMParser).parseFromString(d, "text/html").querySelector(".__cf_email__");
                if (q) {
                    const e = q.getAttribute("data-cfemail");
                    e && g.email.add(decode_cf_email(e))
                }
            } catch (e) {
                console.warn("DOMParser parsed error: ", a, e)
            }
            q = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi;
            k = [];
            for (var n; n = q.exec(d); )
                k.push((new URL(n[2],m)).toString());
            d = "/contact /contact-us /contact-me /about /about-me /about-us /team /our-team /meet-the-team /support /customer-service /feedback /help /sales privacy return location policy faq".split(" ");
            for (m = 0; m < k.length; m++) {
                var p = k[m];
                for (n = 0; n < d.length; ++n)
                    if (p.includes(d[n])) {
                        h.add(p);
                        break
                    }
            }
            for (p = 0; p < k.length; p++)
                try {
                    const e = k[p];
                    if (!e)
                        continue;
                    const l = (new URL(e)).host.toLowerCase();
                    for (const t in f)
                        if (l.includes(t)) {
                            if (0 >= g[t].size) {
                                const v = normalize_social_link(e);
                                v && g[t].add(v)
                            }
                            break
                        }
                } catch (e) {
                    console.warn(`error: ${k[p]}`, e)
                }
            if (b && 0 < h.size) {
                const e = [...h].map(async l=>await extractemail(l, "", !1));
                (await Promise.all(e)).map(l=>{
                    if (l)
                        for (const t in l)
                            l[t].forEach(v=>{
                                g[t].add(v)
                            }
                            )
                }
                )
            }
            console.log("Email for : ", a, g, [...h].join());
            var x = new Set
              , w = new Set
              , y = ".png .jpg .jpeg .gif .webp wixpress.com sentry.io noreply abuse no-reply subscribe mailer-daemon domain.com email.com yourname wix.com".split(" ")
              , z = get_domain(a);
            g.email.forEach(e=>{
                e = e.replace("u003e", "").toLowerCase();
                for (let l = 0; l < y.length; ++l)
                    if (e.includes(y[l]))
                        return;
                x.add(e);
                z && e.includes(z) && w.add(e)
            }
            );
            g.email = 0 < w.size ? w : x;
            return g
        }
    } catch (u) {
        console.log(`visit url error: ${a}`, u)
    }
}
async function findemails(a) {
    const f = new URL(a);
    var b = [];
    "/contact /contact-us /contact-me /about /about-me /about-us /team /our-team /meet-the-team /support /customer-service /feedback /help /sales".split(" ").map(d=>{
        b.push((new URL(d,f)).toString())
    }
    );
    a = b.map(async d=>await extractemail(d, ""));
    return (await Promise.all(a)).filter(d=>d && "" !== d.trim()).join(",")
}
window.addEventListener("message", async function(a) {
    if (a.data && "search" === a.data.type && a.data.data) {
        let b = [];
        a = (new DOMParser).parseFromString(a.data.data, "text/html").querySelectorAll(".listings-item");
        for (var f = 0; f < a.length; ++f) {
            const d = JSON.parse(he.decode(a[f].getAttribute("data-entity")))
              , {id: h, title: g, address: k, imageUrl: m, phone: q, website: n} = {
                ...d.entity
            };
            leads_lnglat.has(h) || (leads_lnglat.add(h),
            b.push({
                phone: q,
                website: n,
                address: k,
                title: g,
                imageUrl: m,
                ...d.routablePoint
            }))
        }
        processing_leads += b.length;
        a = b.map(async d=>{
            try {
                if (d.website && collect_email) {
                    const h = await extractemail(d.website, name, !0);
                    if (h)
                        for (const g in h)
                            d[g] = [...h[g]].join()
                }
            } catch (h) {
                console.warn("collect email error: ", d)
            }
            return d
        }
        );
        f = await Promise.all(a);
        for (a = 0; a < f.length; ++a)
            leads.push(f[a]);
        console.log(leads);
        processing_leads -= b.length;
        document.getElementById("extension_gms_download_btn").innerText = `Export Leads (${leads.length})`
    }
});
