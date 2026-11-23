"use client";

import Image from "next/image";
import { Eye, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { LeadershipMember } from "@/lib/types";

export function PublicLeadershipGrid({ members }: { members: LeadershipMember[] }) {
  const [viewing, setViewing] = useState<LeadershipMember | null>(null);

  useEffect(() => {
    if (!viewing) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [viewing]);

  return (
    <>
      <div className="customLeaderGrid">
        {members.map((member) => (
          <article className="leaderCard customLeaderCard" key={member.id}>
            <div className={`leadershipPortrait${member.imageUrl ? " hasImage" : ""}`}>
              {member.imageUrl ? (
                <Image src={member.imageUrl} alt={`${member.name}, ${member.role}`} fill loading="lazy" sizes="(max-width: 640px) 72vw, 240px" />
              ) : <UsersRound size={42} />}
            </div>
            <div className="leadershipDetails">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <small>{member.tenure}</small>
              <button className="teamMemberViewButton leadershipViewButton" type="button" onClick={() => setViewing(member)}>
                <Eye size={14} /> View Profile
              </button>
            </div>
          </article>
        ))}
      </div>

      {viewing && (
        <div className="publicTeamViewOverlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setViewing(null); }}>
          <section className="publicTeamViewPanel leadershipProfilePanel" role="dialog" aria-modal="true" aria-labelledby="leadership-profile-title">
            <button type="button" className="publicTeamViewClose" aria-label="Close profile" title="Close" onClick={() => setViewing(null)}><X size={18} /></button>
            <div className="publicTeamViewImage">
              {viewing.imageUrl ? <Image src={viewing.imageUrl} alt={viewing.name} fill sizes="260px" style={{ objectFit: "cover", objectPosition: "center top" }} /> : <span>{viewing.name.slice(0, 2).toUpperCase()}</span>}
            </div>
            <div className="publicTeamViewDetails">
              <span className="sectionPill">Our Leadership</span>
              <h2 id="leadership-profile-title">{viewing.name}</h2>
              <strong>{viewing.role}</strong>
              <small className="leadershipProfileTenure">{viewing.tenure}</small>
              <p>{viewing.description || "Profile description will be added soon."}</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
