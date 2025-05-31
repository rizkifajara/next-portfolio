// Module declarations for packages without proper TypeScript support
declare module 'react-syntax-highlighter' {
  import { ComponentType } from 'react';
  
  interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    className?: string;
    children: string;
    [key: string]: any;
  }
  
  export const Prism: ComponentType<SyntaxHighlighterProps>;
  export default ComponentType<SyntaxHighlighterProps>;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const tomorrow: any;
}

declare module 'react-syntax-highlighter/dist/cjs/styles/prism' {
  export const tomorrow: any;
}

interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string;
}

interface Image {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    }
}

export interface PageInfo extends SanityBody {
    _type: 'pageInfo';
    address: string;
    backgroundInformation: string;
    email: string;
    role: string;
    heroImage: Image;
    name: string;
    phoneNumber: string;
    profilePic: Image; 
}

export interface Technology extends SanityBody {
    _type: 'skill';
    image: Image;
    title: string;
}

export interface Skill extends SanityBody {
    _type: 'skill';
    image: Image;
    title: string;
}

export interface Experience extends SanityBody {
    _type: 'experience';
    order: number;
    company: string;
    companyImage: Image;
    dateStarted: string;
    dateEnded: string;
    isCurrentlyWorkingHere: boolean;
    jobTitle: string;
    points: string[];
    technologies: Technology[]; 
}

export interface Project extends SanityBody {
    order: number;
    title: string;
    _type: 'project';
    image: Image;
    linkToBuild: string;
    summary: string;
    technologies: Technology[];
    screenshots?: Image[];
}

export interface Social extends SanityBody {
    _type: 'social';
    title: string;
    url: string;
}

export interface Post extends SanityBody {
    _type: 'post';
    title: string;
    slug: {
        current: string;
    };
    mainImage: {
        asset: {
            _ref: string;
        };
    };
    publishedAt: string;
    body: any[];
}