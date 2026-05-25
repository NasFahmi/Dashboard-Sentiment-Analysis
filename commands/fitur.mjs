#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Bun's new command receives arguments as [bun, new, template-name, ...args]
// So we need to get the feature name from process.argv[3] onwards
// For our case: bun new fitur <feature-name> [options]
const args = process.argv.slice(2);
if (args[0] !== 'fitur') {
  console.error('This command should be used as: bun new fitur <feature-name>');
  process.exit(1);
}

const featureName = args[1];
const additionalArgs = args.slice(2);
const hasStore = additionalArgs.includes('--store') || additionalArgs.includes('-s');

if (!featureName) {
  console.error('Please provide a feature name: bun new fitur <feature-name>');
  console.error('Options:');
  console.error('  --store, -s    Include a zustand store');
  process.exit(1);
}

// Capitalize the first letter of the feature name
const lowerCaseFeatureName = featureName.charAt(0).toLowerCase() + featureName.slice(1);

// Define the features directory path
const featuresDir = path.join(process.cwd(), 'src', 'features');
const featureDir = path.join(featuresDir, lowerCaseFeatureName);

// Create the main feature directory if it doesn't exist
if (!fs.existsSync(featuresDir)) {
  fs.mkdirSync(featuresDir, { recursive: true });
}

if (fs.existsSync(featureDir)) {
  console.error(`Feature ${lowerCaseFeatureName} already exists!`);
  process.exit(1);
}

fs.mkdirSync(featureDir, { recursive: true });

// Create subdirectories
const subdirs = ['components', 'hooks', 'pages', 'repository', 'types'];
if (hasStore) {
  subdirs.push('store');
}

subdirs.forEach(subdir => {
  const subdirPath = path.join(featureDir, subdir);
  fs.mkdirSync(subdirPath, { recursive: true });
});

// Create the test directory inside repository
const testDir = path.join(featureDir, 'repository', '__tests__');
fs.mkdirSync(testDir, { recursive: true });

// Create the repository file with .tsx extension using lowercase
const repositoryContent = `// ${featureName}.repository.tsx\n\n`;
const repositoryFilePath = path.join(featureDir, 'repository', `${featureName}.repository.tsx`);
fs.writeFileSync(repositoryFilePath, repositoryContent);

// Create the test file using lowercase
const testContent = `// ${featureName}.repository.test.ts\n\n`;
const testFilePath = path.join(featureDir, 'repository', '__tests__', `${featureName}.repository.test.ts`);
fs.writeFileSync(testFilePath, testContent);

// Create the store file if requested
if (hasStore) {
  // Add zustand as dependency if not already present
  const storeContent = `import { create } from 'zustand';\n\n// Define your state interface\nexport interface ${capitalizedFeatureName}State {\n  // Add your state properties here\n}\n\n// Define your actions interface\nexport interface ${capitalizedFeatureName}Actions {\n  // Add your actions here\n}\n\n// Combine state and actions\nexport type ${capitalizedFeatureName}Store = ${capitalizedFeatureName}State & ${capitalizedFeatureName}Actions;\n\n// Create the store\nexport const use${capitalizedFeatureName}Store = create<${capitalizedFeatureName}Store>((set, get) => ({\n  // Initialize your state and implement actions here\n}));\n`;
  const storeFilePath = path.join(featureDir, 'store', `${capitalizedFeatureName}Store.ts`);
  fs.writeFileSync(storeFilePath, storeContent);
}

// Create the page file with default export
const pageContent = `import React from 'react';\n\nconst ${capitalizedFeatureName}Page: React.FC = () => {\n  return (\n    <div className=\"container mx-auto p-4\">\n      <h1 className=\"text-2xl font-bold\">${capitalizedFeatureName} Page</h1>\n      {/* Add your page content here */}\n    </div>\n  );\n};\n\nexport default ${capitalizedFeatureName}Page;\n`;
const pageFilePath = path.join(featureDir, 'pages', `${capitalizedFeatureName}Page.tsx`);
fs.writeFileSync(pageFilePath, pageContent);

console.log(`✅ Feature "${capitalizedFeatureName}" has been created successfully!`);
console.log(`📁 Location: ${featureDir}`);
console.log(`📋 Structure created:`);
console.log(`   ├── components/`);
console.log(`   ├── hooks/`);
console.log(`   ├── pages/`);
console.log(`   │   └── ${capitalizedFeatureName}Page.tsx`);
console.log(`   ├── repository/`);
console.log(`   │   ├── __tests__/`);
console.log(`   │   │   └── ${featureName}.repository.test.ts`);
console.log(`   │   └── ${featureName}.repository.tsx`);
console.log(`   ├── types/`);

if (hasStore) {
  console.log(`   └── store/`);
  console.log(`       └── ${capitalizedFeatureName}Store.ts`);
}

console.log('\n📝 To use this feature, import the page component in your router.');