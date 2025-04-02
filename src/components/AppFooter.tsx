import Link from 'next/link';

export default function AppFooter() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#FF9B05] to-[#FF5005] text-white py-16 max-screen-xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Main Info */}
          <div className="col-span-1">
            <h2 className="font-bold text-4xl mb-4 font-raleway">
              Wild Billie
            </h2>
            <p className="text-sm mb-6">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:opacity-80">
                Loremipsum
              </Link>
              <Link href="#" className="hover:opacity-80">
                Loremipsum
              </Link>
              <Link href="#" className="hover:opacity-80">
                Loremipsum
              </Link>
            </div>
          </div>

          {/* Column 2 - Links */}
          <div className="col-span-1">
            <h3 className="font-bold text-2xl mb-4">Lorem</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:opacity-80">
                  Lorem
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80">
                  Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80">
                  Lorem
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80">
                  Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80">
                  Lorem
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Links */}
          <div className="col-span-1">
            <h3 className="font-bold text-2xl mb-4">Lorem</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:opacity-80">
                  Lorem
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80">
                  Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80">
                  Lorem
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80">
                  Ipsum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80">
                  Lorem
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Description */}
          <div className="col-span-1">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
