import { KeycloakInstance } from "keycloak-js";
import { ReactNode } from "react";

export interface KeycloakContextType {
  keycloak: KeycloakInstance | null;
  authenticated: boolean;
  keycloakInitialized: boolean;
}

export interface KeycloakContextProviderProps {
  children: ReactNode;
}

export type FormDataEntreprise = {
  nom_entreprise: string;
  numero_siret: string;
  secteur_activite: string;
  collaborateurs: string;
  adresse: string;
  telephone: string;
  site_web: string;
  linkedin: string;
  nom_contact: string;
  fonction_contact: string;
  description_entreprise: string;
  logo: FileList | null;
};

export type FormDataApprenant = {
  nom: string;
  prenom: string;
  date_naissance: string;
  telephone: string;
  ville: string;
  niveau_etude: string;
  specialite: string;
  cv: FileList | null;
  photo: FileList | null;
  presentation: string;
  linkedin: string;
  portfolio: string;
  objectives: string[];
};

export type KeyType =
  | "nom_entreprise"
  | "numero_siret"
  | "secteur_activite"
  | "collaborateurs"
  | "adresse"
  | "telephone"
  | "site_web"
  | "linkedin"
  | "nom_contact"
  | "fonction_contact"
  | "description_entreprise"
  | "logo";

export type PagesLinkTypes =
  | {
      path: string;
      name: string;
      children?: undefined;
    }
  | {
      name: string;
      children: {
        path: string;
        name: string;
      }[];
      path?: undefined;
    };

export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

export type FormDataSirene = {
  pays: CountryType | null;
  numero_sirene: string; // Numéro SIREN est un string pour permettre la validation regex
};

export type EntrepriseInfoWithValideSireneType = {
  forme_juridique: string;
  activite_entreprise: string;
  taille_entreprise: string;
  effectifs_entreprise: string;
  date_creation_entreprise: string;
  siret_entreprise: string;
  nic_entreprise: string;
  etat_administratif_entreprise: string;
  nom_entreprise: string;
  adresse_entreprise: string;
  sirene_entreprise: string;
};

export type CreateEntrepriseType = {
  telephone: string;
  site_web: string | undefined;
  linkedin: string | undefined;
  nom_contact: string;
  fonction_contact: string;

  forme_juridique: string;
  activite_entreprise: string;
  taille_entreprise: string;
  effectifs_entreprise: string;
  date_creation_entreprise: string;
  siret_entreprise: string;
  nic_entreprise: string;
  etat_administratif_entreprise: string;
  nom_entreprise: string;
  adresse_entreprise: string;
  sirene_entreprise: string;
};
