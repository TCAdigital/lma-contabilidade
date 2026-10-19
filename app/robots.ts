import type { MetadataRoute } from 'next';
import { website } from '@/lib/content';
export default function robots():MetadataRoute.Robots{return {rules:[{userAgent:'*',allow:'/'}],sitemap:`${website.domain}/sitemap.xml`}}
