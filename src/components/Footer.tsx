import { SOURCE_ARTICLE_URL } from '@/lib/constants'

const REPO_URL = 'https://github.com/Laurentiu-Andronache/dose-calculator'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Based on{' '}
          <a
            href={SOURCE_ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-teal-600 hover:underline dark:text-teal-400"
          >
            &quot;How to estimate human equivalent doses from animal studies&quot;
          </a>{' '}
          by Ólafur Pall Ólafsson
        </p>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Created by Laurențiu Andronache |{' '}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-teal-600 hover:underline dark:text-teal-400"
          >
            GitHub
          </a>
        </p>
        <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-500">
          This calculator is for educational purposes only. Always consult a qualified professional
          for medical or research decisions.
        </p>
      </div>
    </footer>
  )
}
