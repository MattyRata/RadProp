"use client";
import { useState } from "react";

export default function RadProp() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState("");
  const [form, setForm] = useState({
    facilityName:"",facilityType:"",location:"",
    modality:"",shiftType:"",experience:"",
    hourlyRate:"",contractLength:"",housing:"",extras:"",
  });

  const update=(k,v)=>setForm(f=>({...f,[k]:v}));

  const generate=async()=>{
    setLoading(true);
    try{
      const res=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({form})});
      const data=await res.json();
      setProposal(data.proposal);
      setStep(3);
    }catch(e){
      setProposal("Error. Please try again.");
      setStep(3);
    }
    setLoading(false);
  };

  const s={width:"100%",background:"#0d1117",border:"1px solid #30363d",borderRadius:8,padding:"12px 16px",color:"#e6edf3",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"Georgia,serif"};
  const l={display:"block",fontSize:11,fontWeight:600,color:"#7d8590",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8};
  const ok=step===0?form.facilityName&&form.facilityType&&form.location:step===1?form.modality&&form.shiftType&&form.experience:form.hourlyRate&&form.contractLength;

  return(
    <div style={{fontFamily:"Georgia,serif",minHeight:"100vh",background:"#010409",color:"#e6edf3"}}>
      <div style={{borderBottom:"1px solid #21262d",padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,background:"linear-gradient(135deg,#58a6ff,#1f6feb)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>⚕</div>
          <div>
            <div style={{fontSize:15,fontWeight:700}}>RadProp</div>
            <div style={{fontSize:10,color:"#7d8590",textTransform:"uppercase"}}>Contract Proposal Generator</div>
          </div>
        </div>
        <div style={{fontSize:11,color:"#7d8590"}}>For Rad Techs · By Rad Techs</div>
      </div>
      <div style={{maxWidth:600,margin:"0 auto",padding:"32px 20px"}}>
        {step<3&&<div style={{marginBottom:32}}><div style={{display:"flex",gap:4,marginBottom:12}}>{[0,1,2].map(i=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=step?"#58a6ff":"#21262d"}}/>)}</div><div style={{fontSize:12,color:"#7d8590"}}>Step {step+1} of 3 — <span style={{color:"#e6edf3"}}>{["Facility Info","Position Details","Rates & Terms"][step]}</span></div></div>}
        {step===0&&<div><h2 style={{fontSize:24,fontWeight:700,marginBottom:6}}>Where are you going?</h2><p style={{color:"#7d8590",fontSize:14,marginBottom:28}}>Tell us about the facility.</p><div style={{display:"flex",flexDirection:"column",gap:20}}><div><label style={l}>Facility Name</label><input style={s} placeholder="Kaiser Permanente Sacramento" value={form.facilityName} onChange={e=>update("facilityName",e.target.value)}/></div><div><label style={l}>Facility Type</label><select style={{...s,color:form.facilityType?"#e6edf3":"#484f58"}} value={form.facilityType} onChange={e=>update("facilityType",e.target.value)}><option value="">Select type...</option><option>Hospital (Level I Trauma)</option><option>Hospital (Community)</option><option>Outpatient Imaging Center</option><option>Urgent Care / ED</option><option>Mobile Imaging</option><option>VA / Government</option></select></div><div><label style={l}>Location</label><input style={s} placeholder="Sacramento, CA" value={form.location} onChange={e=>update("location",e.target.value)}/></div></div></div>}
        {step===1&&<div><h2 style={{fontSize:24,fontWeight:700,marginBottom:6}}>What's the position?</h2><p style={{color:"#7d8590",fontSize:14,marginBottom:28}}>Modality, schedule, experience.</p><div style={{display:"flex",flexDirection:"column",gap:20}}><div><label style={l}>Primary Modality</label><select style={{...s,color:form.modality?"#e6edf3":"#484f58"}} value={form.modality} onChange={e=>update("modality",e.target.value)}><option value="">Select modality...</option><option>CT (Computed Tomography)</option><option>MRI</option><option>X-Ray / General Rad</option><option>Mammography</option><option>Interventional Radiology</option><option>Nuclear Medicine</option><option>Ultrasound</option><option>Multi-modality</option></select></div><div><label style={l}>Shift Type</label><select style={{...s,color:form.shiftType?"#e6edf3":"#484f58"}} value={form.shiftType} onChange={e=>update("shiftType",e.target.value)}><option value="">Select shift...</option><option>Days (0600-1430)</option><option>Evenings (1430-2300)</option><option>Nights (2300-0700)</option><option>Rotating</option><option>PRN / Per Diem</option><option>Weekend Only</option></select></div><div><label style={l}>Years of Experience</label><select style={{...s,color:form.experience?"#e6edf3":"#484f58"}} value={form.experience} onChange={e=>update("experience",e.target.value)}><option value="">Select...</option><option>1-2 years</option><option>3-5 years</option><option>6-10 years</option><option>10+ years</option></select></div></div></div>}
        {step===2&&<div><h2 style={{fontSize:24,fontWeight:700,marginBottom:6}}>Your terms.</h2><p style={{color:"#7d8590",fontSize:14,marginBottom:28}}>What are you asking for?</p><div style={{display:"flex",flexDirection:"column",gap:20}}><div><label style={l}>Desired Hourly Rate ($)</label><input style={s} type="number" placeholder="65" value={form.hourlyRate} onChange={e=>update("hourlyRate",e.target.value)}/></div><div><label style={l}>Contract Length</label><select style={{...s,color:form.contractLength?"#e6edf3":"#484f58"}} value={form.contractLength} onChange={e=>update("contractLength",e.target.value)}><option value="">Select length...</option><option>4 weeks</option><option>8 weeks</option><option>13 weeks</option><option>26 weeks</option><option>Ongoing / PRN</option></select></div><div><label style={l}>Housing / Stipend</label><select style={{...s,color:form.housing?"#e6edf3":"#484f58"}} value={form.housing} onChange={e=>update("housing",e.target.value)}><option value="">Select...</option><option>Housing stipend requested</option><option>Facility-provided housing</option><option>No housing needed (local)</option></select></div><div><label style={l}>Additional Notes (optional)</label><textarea style={{...s,resize:"vertical"}} placeholder="e.g. ARRT certified, bilingual, dual modality CT/MR..." value={form.extras} onChange={e=>update("extras",e.target.value)} rows={3}/></div></div></div>}
        {step===3&&<div><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}><div style={{width:36,height:36,background:"linear-gradient(135deg,#238636,#2ea043)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>✓</div><div><div style={{fontSize:18,fontWeight:700}}>Proposal Ready</div><div style={{fontSize:12,color:"#7d8590"}}>{form.facilityName} · {form.modality}</div></div></div><div style={{background:"#0d1117",border:"1px solid #30363d",borderRadius:12,padding:24,marginBottom:20,fontSize:14,lineHeight:1.75,whiteSpace:"pre-wrap"}}>{proposal}</div><div style={{display:"flex",gap:12}}><button onClick={()=>navigator.clipboard.writeText(proposal)} style={{flex:1,background:"#21262d",border:"1px solid #30363d",borderRadius:8,padding:12,color:"#e6edf3",fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>Copy</button><button onClick={()=>{setStep(0);setProposal("");setForm({facilityName:"",facilityType:"",location:"",modality:"",shiftType:"",experience:"",hourlyRate:"",contractLength:"",housing:"",extras:""});}} style={{flex:1,background:"#1f6feb",border:"none",borderRadius:8,padding:12,color:"#fff",fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>New Proposal</button></div></div>}
        {step<3&&<div style={{display:"flex",gap:12,marginTop:32}}>{step>0&&<button onClick={()=>setStep(s=>s-1)} style={{flex:1,background:"transparent",border:"1px solid #30363d",borderRadius:8,padding:14,color:"#7d8590",fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>Back</button>}<button onClick={()=>step===2?generate():setStep(s=>s+1)} disabled={!ok||loading} style={{flex:2,background:ok&&!loading?"linear-gradient(135deg,#1f6feb,#388bfd)":"#21262d",border:"none",borderRadius:8,padding:14,color:ok&&!loading?"#fff":"#484f58",fontSize:14,fontWeight:600,cursor:ok&&!loading?"pointer":"not-allowed",fontFamily:"inherit"}}>{loading?"Generating...":step===2?"Generate Proposal ✦":"Continue →"}</button></div>}
        <div style={{marginTop:40,paddingTop:20,borderTop:"1px solid #21262d",textAlign:"center",fontSize:11,color:"#484f58"}}>RadProp · Built for Rad Techs · Powered by AI</div>
      </div>
    </div>
  );
}
