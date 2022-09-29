# Broken App Issues
} catch {  instead of catch (err)
Variables were terrible (single characters 'd' and 'r')
next() was used despite there not being a next route; corrected to simply return an error
refactored to arrow functions