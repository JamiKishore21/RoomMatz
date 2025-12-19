#!/bin/bash
# URL Configuration Verification Script
# Verifies that all hardcoded localhost URLs have been replaced with environment variables

echo "🔍 Checking for remaining hardcoded localhost URLs..."
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Count of issues found
ISSUES=0

# Search in frontend files
echo ""
echo "📁 Checking Frontend Files..."
echo "---"

if grep -r "localhost:5000\|localhost:5173" frontend/ --include="*.jsx" --include="*.js" --include="*.json" 2>/dev/null | grep -v node_modules | grep -v ".env"; then
    echo -e "${RED}❌ Found hardcoded localhost URLs in frontend!${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ No hardcoded localhost URLs found in frontend${NC}"
fi

# Search in backend files (excluding node_modules and docs)
echo ""
echo "📁 Checking Backend Files..."
echo "---"

if grep -r "localhost:5000\|localhost:5173" backend/ --include="*.js" 2>/dev/null | grep -v node_modules; then
    echo -e "${RED}❌ Found hardcoded localhost URLs in backend!${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ No hardcoded localhost URLs found in backend${NC}"
fi

# Check if environment variables are defined
echo ""
echo "📋 Checking Environment Variable Configuration..."
echo "---"

if [ -f "frontend/.env" ]; then
    echo -e "${GREEN}✅ frontend/.env exists${NC}"
else
    echo -e "${RED}❌ frontend/.env not found${NC}"
    ISSUES=$((ISSUES + 1))
fi

if [ -f "frontend/.env.production" ]; then
    echo -e "${GREEN}✅ frontend/.env.production exists${NC}"
else
    echo -e "${RED}❌ frontend/.env.production not found${NC}"
    ISSUES=$((ISSUES + 1))
fi

if [ -f "frontend/.env.development" ]; then
    echo -e "${GREEN}✅ frontend/.env.development exists${NC}"
else
    echo -e "${RED}❌ frontend/.env.development not found${NC}"
    ISSUES=$((ISSUES + 1))
fi

if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✅ backend/.env exists${NC}"
else
    echo -e "${RED}❌ backend/.env not found${NC}"
    ISSUES=$((ISSUES + 1))
fi

# Verify environment variables are set correctly
echo ""
echo "🔐 Verifying Environment Variable Values..."
echo "---"

if grep -q "VITE_API_URL" frontend/.env 2>/dev/null; then
    echo -e "${GREEN}✅ VITE_API_URL configured in frontend/.env${NC}"
else
    echo -e "${RED}❌ VITE_API_URL not found in frontend/.env${NC}"
    ISSUES=$((ISSUES + 1))
fi

if grep -q "NODE_ENV" backend/.env 2>/dev/null; then
    echo -e "${GREEN}✅ NODE_ENV configured in backend/.env${NC}"
else
    echo -e "${RED}❌ NODE_ENV not found in backend/.env${NC}"
    ISSUES=$((ISSUES + 1))
fi

# Check for import.meta.env usage
echo ""
echo "📝 Checking for Environment Variable Usage..."
echo "---"

API_URL_USAGE=$(grep -r "import.meta.env.VITE_API_URL\|import.meta.env.VITE_SOCKET_URL" frontend/ --include="*.jsx" --include="*.js" 2>/dev/null | grep -v node_modules | wc -l)

if [ "$API_URL_USAGE" -gt 0 ]; then
    echo -e "${GREEN}✅ Found $API_URL_USAGE instances of environment variable usage${NC}"
else
    echo -e "${YELLOW}⚠️ No environment variable usage found - ensure import.meta.env is being used${NC}"
    ISSUES=$((ISSUES + 1))
fi

# Summary
echo ""
echo "=============================================="
if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Project is ready for deployment.${NC}"
    echo ""
    echo "Next Steps:"
    echo "1. Update production URLs in .env.production files"
    echo "2. Run 'npm run build:prod' to create production build"
    echo "3. Follow DEPLOYMENT_GUIDE.md for deployment instructions"
else
    echo -e "${RED}❌ Found $ISSUES issue(s). Please fix before deploying.${NC}"
fi
echo "=============================================="
