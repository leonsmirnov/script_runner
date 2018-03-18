import sys

if __name__ == "__main__":
	print >> sys.stdout, "Hello, World! - with error"	
	sys.stdout.flush()
	print >> sys.stderr, "FATAL ERROR"
	sys.stderr.flush()
	sys.exit(1)
