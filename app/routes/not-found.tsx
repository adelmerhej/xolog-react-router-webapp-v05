import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-purple-100 dark:from-blue-950 dark:via-gray-900 dark:to-purple-950 p-4 overflow-hidden">
      <div className="max-w-lg w-full text-center space-y-8 relative z-10">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-primary rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-10 right-20 w-16 h-16 border-4 border-secondary rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-40 right-10 w-12 h-12 border-4 border-accent rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Main 404 display */}
        <div className="relative">
          <div className="text-[12rem] font-extrabold tracking-widest text-gray-900 dark:text-gray-100 opacity-10 leading-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-64 h-64 text-primary animate-float" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shipment Not Found</h1>
        
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          The cargo you're tracking seems to have taken an unexpected route. 
          Our logistics network can't locate this destination.
        </p>
        
        <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full md:w-auto" size="lg" variant="default">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Return Home
            </Button>
          </Link>
          
          <Link to="/dashboard">
            <Button className="w-full md:w-auto" size="lg" variant="outline">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M22 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.45 5.11L2 12V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 16H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 16H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 pt-8">
          Error Code: XO-404 • Destination Unreachable
        </div>
      </div>
    </div>
  );
}