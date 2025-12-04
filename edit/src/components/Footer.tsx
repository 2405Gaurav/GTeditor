import { Heart } from "lucide-react";
const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 py-6 mt-12">
      <div className="container flex items-center justify-center">
        <p className="text-muted-foreground flex items-center gap-2 text-sm">
          © {new Date().getFullYear()}
          <a 
            href="https://thegauravthakur.in" 
            target="_blank"
            className="text-primary hover:text-primary/80 transition-colors underline decoration-dotted underline-offset-4"
          >
            Gaurav
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;