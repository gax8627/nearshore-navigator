module.exports=[22689,e=>{"use strict";async function t(e){let t=new Date().toISOString(),n=process.env.SLACK_WEBHOOK_URL,o="TARIFF_PANIC"===e.intentCategory?"🚨":"CRITICAL"===e.urgency?"🔥":"📈",a=`${o} *NEW LEAD CAPTURED: ${e.intentCategory}*
> *Name:* ${e.name}
> *Company:* ${e.company}
> *Email:* ${e.email}
> *Urgency:* ${e.urgency}
> *Score:* ${e.score}
> *Tags:* ${e.tags.join(", ")}`;if(console.log(`[${t}] ${a}`),n)try{await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:a})})}catch(e){console.error("[Notifications] Failed to send Slack alert:",e)}return{success:!0,dispatchedAt:t}}e.s(["notifyLead",()=>t])}];

//# sourceMappingURL=lib_notifications_ts_3395db0e._.js.map