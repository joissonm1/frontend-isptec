"use client";

import { motion } from "framer-motion";

export type TeamMember = {
  name: string;
  role: string;
  focus: string;
};

export type TeamMembersCardProps = {
  team: TeamMember[];
  className?: string;
};

export function TeamMembersCard({ team, className }: TeamMembersCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={
        className ??
        "ui-card rounded-2xl border border-border p-5"
      }
    >
      <h3 className="text-lg font-semibold text-foreground">Equipa que desenvolveu</h3>
      <p className="mt-1 text-sm text-muted">Time multidisciplinar entre tecnologia, academia e mercado.</p>
      <ul className="mt-4 space-y-3">
        {team.map((member) => (
          <li key={member.name} className="rounded-xl bg-background/50 p-3 shadow-sm">
            <p className="text-sm font-semibold text-foreground">{member.name}</p>
            <p className="text-xs text-primary">{member.role}</p>
            <p className="mt-1 text-xs text-muted">{member.focus}</p>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
