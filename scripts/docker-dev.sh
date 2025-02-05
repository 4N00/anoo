#!/bin/bash

# Make script exit on first error
set -e

# Define colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print colored message
print_message() {
    echo -e "${2}${1}${NC}"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_message "Docker is not running. Please start Docker first." "$RED"
        exit 1
    fi
}

# Show help message
show_help() {
    echo "Usage: ./docker-dev.sh [command]"
    echo ""
    echo "Commands:"
    echo "  up        Start development environment"
    echo "  down      Stop development environment"
    echo "  rebuild   Rebuild and start development environment"
    echo "  logs      Show logs from all containers"
    echo "  shell     Open shell in app container"
    echo "  db        Open database CLI"
    echo "  test      Run tests in container"
    echo "  clean     Remove all containers and volumes"
    echo "  help      Show this help message"
}

# Start development environment
start_dev() {
    print_message "Starting development environment..." "$GREEN"
    docker-compose -f docker-compose.dev.yml up -d
    print_message "Development environment is ready!" "$GREEN"
    print_message "App: http://localhost:3000" "$YELLOW"
    print_message "Adminer: http://localhost:8080" "$YELLOW"
    print_message "MailHog: http://localhost:8025" "$YELLOW"
}

# Stop development environment
stop_dev() {
    print_message "Stopping development environment..." "$YELLOW"
    docker-compose -f docker-compose.dev.yml down
    print_message "Development environment stopped." "$GREEN"
}

# Rebuild and start development environment
rebuild_dev() {
    print_message "Rebuilding development environment..." "$YELLOW"
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml build --no-cache
    docker-compose -f docker-compose.dev.yml up -d
    print_message "Development environment rebuilt and started!" "$GREEN"
}

# Show logs
show_logs() {
    docker-compose -f docker-compose.dev.yml logs -f
}

# Open shell in app container
open_shell() {
    docker-compose -f docker-compose.dev.yml exec app sh
}

# Open database CLI
open_db() {
    docker-compose -f docker-compose.dev.yml exec db psql -U postgres -d anoo
}

# Run tests
run_tests() {
    docker-compose -f docker-compose.dev.yml exec app npm test
}

# Clean up everything
clean_all() {
    print_message "Cleaning up development environment..." "$YELLOW"
    docker-compose -f docker-compose.dev.yml down -v
    print_message "Development environment cleaned." "$GREEN"
}

# Check if Docker is running
check_docker

# Parse command line arguments
case "$1" in
    up)
        start_dev
        ;;
    down)
        stop_dev
        ;;
    rebuild)
        rebuild_dev
        ;;
    logs)
        show_logs
        ;;
    shell)
        open_shell
        ;;
    db)
        open_db
        ;;
    test)
        run_tests
        ;;
    clean)
        clean_all
        ;;
    help|*)
        show_help
        ;;
esac